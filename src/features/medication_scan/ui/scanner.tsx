import { BrowserDatamatrixCodeReader, IScannerControls } from '@zxing/browser';
import { type DecodeContinuouslyCallback } from '@zxing/browser/esm/common/DecodeContinuouslyCallback';
import { type JSX, createSignal, onMount, onCleanup, mergeProps } from 'solid-js';

function hasGetUserMedia() {
  return !!navigator.mediaDevices?.getUserMedia;
}

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

export type ScannerProps = JSX.VideoHTMLAttributes<HTMLVideoElement> & {
  videoConstraints?: MediaStreamConstraints['video'];
  onUserMedia?: (stream: MediaStream, video: HTMLVideoElement) => void;
  onControls?: (controls: IScannerControls) => void;
  onScanResult?: (result: string) => void;
  onUserMediaError?: (error: string | DOMException) => void;
};

const defaultProps = {
  onUserMedia: () => undefined,
  onUserMediaError: () => undefined,
  onControls: () => undefined,
  onScanResult: () => undefined,
} as const;

export function Scanner(props: ScannerProps) {
  const mergedProps = mergeProps(defaultProps, props);

  let video: HTMLVideoElement;
  let activeStream: MediaStream | null = null;
  let activeControls: IScannerControls | null = null;

  const [requestUserMediaId, setRequestUserMediaId] = createSignal<number>(0);
  const [acquiredUserMedia, setAcquiredUserMedia] = createSignal<boolean>(false);

  const requestScanner = async (stream: MediaStream, callback: DecodeContinuouslyCallback) => {
    const hints = new Map();
    // 8 === ASSUME_GS1
    hints.set(8, true);
    const codeReader = new BrowserDatamatrixCodeReader(hints);
    const controls = await codeReader.decodeFromStream(stream, undefined, callback);
    return controls;
  };

  const requestUserMedia = async () => {
    const constraints: MediaStreamConstraints = {
      video:
        typeof mergedProps.videoConstraints !== 'undefined' ? mergedProps.videoConstraints : true,
    };

    setRequestUserMediaId((prev) => prev + 1);
    const currentRequestUserMediaId = requestUserMediaId;

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (currentRequestUserMediaId !== requestUserMediaId) {
        stopMediaStream(stream);
        return;
      }
      activeStream = stream;

      if (video) {
        video.srcObject = stream;
      }

      setAcquiredUserMedia(true);
      mergedProps.onUserMedia(stream, video);

      // Used to pass callback through promise function
      const onScanResult = mergedProps.onScanResult;

      const controls = await requestScanner(activeStream, (result, error, _controls) => {
        if (error) {
          return;
        }
        if (result !== undefined) {
          const FNC1_REGEXP = /\u001d/g;
          const filteredResult = result.getText().replace(FNC1_REGEXP, '');
          onScanResult(filteredResult);
        }
      });
      activeControls = controls;
      mergedProps.onControls(controls);
    } catch (err) {
      setAcquiredUserMedia(false);
      mergedProps.onUserMediaError(err as string | DOMException);
    }
  };

  onMount(() => {
    if (!hasGetUserMedia()) {
      mergedProps.onUserMediaError('getUserMedia not supported');
      return;
    }

    if (!acquiredUserMedia()) {
      requestUserMedia().catch((e) => {
        console.error('failed to request user media', e);
      });
    }
  });

  onCleanup(() => {
    if (acquiredUserMedia()) {
      stopMediaStream(activeStream);
      activeControls?.stop();
    }
  });

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
