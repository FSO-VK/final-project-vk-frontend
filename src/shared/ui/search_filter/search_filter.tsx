import { InputField } from '../form_inputs';
import { createForm } from '@tanstack/solid-form';
import { createEffect, createSignal } from 'solid-js';
import { IconStyle, SearchIcon } from '../icons';
import { debounce } from '@/shared/lib/common_decorators';
import './search_filter.css';

export interface SearchFilterProps {
  searchValues: { value: string; label: string }[];
  onFiltered: (filtered: { value: string; label: string }[]) => void;
}

const DEFAULT_SEARCH_DELAY = 300;

export function SearchFilter(props: SearchFilterProps) {
  const [query, setQuery] = createSignal('');

  const queryForm = createForm(() => ({
    defaultValues: {
      query: '',
    },
    onSubmit: ({ value }) => {
      setQuery(value.query);
    },
  }));

  createEffect(() => {
    const filtered = props.searchValues
      .map((searchable) => {
        return {
          value: searchable.value,
          label: searchable.label.toLowerCase(),
        };
      })
      .filter((searchable) => searchable.label.startsWith(query()));
    props.onFiltered(filtered);
  });

  const handleSubmitQuery = () => {
    queryForm.handleSubmit().catch((e) => {
      console.error(e);
    });
  };

  let debouncedHandleSubmitQuery;
  if (!import.meta.env.SSR) {
    debouncedHandleSubmitQuery = debounce(handleSubmitQuery, DEFAULT_SEARCH_DELAY);
  } else {
    debouncedHandleSubmitQuery = handleSubmitQuery;
  }

  return (
    <div class="search-filter">
      <form
        class="search-filter__search"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmitQuery();
        }}
        novalidate
      >
        <queryForm.Field
          name="query"
          children={(field) => (
            <InputField
              type="text"
              name={field().name}
              id={field().name}
              value={field().state.value}
              class="search-filter__search"
              afterElements={
                <SearchIcon
                  iconStyle={IconStyle.Active}
                  elementClass="search-filter__search-icon"
                />
              }
              onInput={(e) => {
                field().handleChange(e.currentTarget.value);
                if (!import.meta.env.SSR) {
                  debouncedHandleSubmitQuery();
                }
              }}
            />
          )}
        />
      </form>
    </div>
  );
}
