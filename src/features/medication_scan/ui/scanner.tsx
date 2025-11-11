import { type JSX, createSignal, onMount, onCleanup, createEffect, mergeProps } from 'solid-js';

function hasGetUserMedia() {
  return !!navigator.mediaDevices?.getUserMedia;
}

export type ScannerProps = JSX.VideoHTMLAttributes<HTMLVideoElement> & {
  mirrored?: boolean;
  videoConstraints?: MediaStreamConstraints['video'];
  onUserMedia?: (stream: MediaStream) => void;
  onUserMediaError?: (error: string | DOMException) => void;
};

const defaultProps = {
  mirrored: false,
  onUserMedia: () => undefined,
  onUserMediaError: () => undefined,
} as const;

const [hasUserMedia, setHasUserMedia] = createSignal<boolean>(false);

export function Scanner(props: ScannerProps) {
  const mergedProps = mergeProps(defaultProps, props);

  let video: HTMLVideoElement | null = null;
  let activeStream: MediaStream | null = null;

  const [requestUserMediaId, setRequestUserMediaId] = createSignal<number>(0);
  const [unmounted, setUnmounted] = createSignal<boolean>(false);

  onMount(() => {
    setUnmounted(false);

    if (!hasGetUserMedia()) {
      mergedProps.onUserMediaError('getUserMedia not supported');

      return;
    }

    if (!hasUserMedia()) {
      requestUserMedia();
    }
  });

  createEffect(() => {
    if (!hasGetUserMedia()) {
      mergedProps.onUserMediaError('getUserMedia not supported');

      return;
    }
  });

  onCleanup(() => {
    setUnmounted(true);
    stopAndCleanup();
  });

  const stopMediaStream = (stream: MediaStream | null) => {
    if (stream) {
      if (stream.getVideoTracks) {
        stream.getVideoTracks().map((track) => {
          stream.removeTrack(track);
          track.stop();
        });
      } else {
        (stream as unknown as MediaStreamTrack).stop();
      }
    }
  };

  const stopAndCleanup = () => {
    if (hasUserMedia()) {
      stopMediaStream(activeStream);
    }
  };

  const requestUserMedia = () => {
    const constraints: MediaStreamConstraints = {
      video:
        typeof mergedProps.videoConstraints !== 'undefined' ? mergedProps.videoConstraints : true,
    };

    setRequestUserMediaId((prev) => prev + 1);
    const myRequestUserMediaId = requestUserMediaId;

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (unmounted() || myRequestUserMediaId !== requestUserMediaId) {
          stopMediaStream(stream);
        } else {
          handleUserMedia(null, stream);
        }
      })
      .catch(() => {
        // TODO: here was e
        handleUserMedia('');
      });
  };

  const handleUserMedia = (err: string | DOMException | null, stream?: MediaStream) => {
    if (err || !stream) {
      setHasUserMedia(false);
      if (err) mergedProps.onUserMediaError(err);

      return;
    }

    activeStream = stream;

    if (video) {
      video.srcObject = stream;
    }
    setHasUserMedia(true);

    mergedProps.onUserMedia(stream);
  };

  return (
    <video
      autoplay
      playsinline
      muted
      ref={(ref) => {
        video = ref;
      }}
      {...mergedProps}
    />
  );
}
