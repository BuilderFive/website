import { useLayoutContext } from '@livekit/components-react';
import * as React from 'react';
import { mergeProps } from '~/util/hooks/mergeprops';

/** @alpha */
export interface SettingsMenuToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

/**
 * The `SettingsMenuToggle` component is a button that toggles the visibility of the `SettingsMenu` component.
 * @remarks
 * For the component to have any effect it has to live inside a `LayoutContext` context.
 *
 * @alpha
 */
export const SettingsMenuToggle = /* @__PURE__ */ React.forwardRef<
  HTMLButtonElement,
  SettingsMenuToggleProps
>(function SettingsMenuToggle(props: SettingsMenuToggleProps, ref) {
  const { mergedProps } = useSettingsToggle({ props });

  return (
    <button ref={ref} {...mergedProps}>
      {props.children}
    </button>
  );
});

/** @alpha */
export interface UseSettingsToggleProps {
  props: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

/**
 * The `useSettingsToggle` hook provides state and functions for toggling the settings menu.
 * @remarks
 * Depends on the `LayoutContext` to work properly.
 * @see {@link SettingsMenu}
 * @alpha
 */
export function useSettingsToggle({ props }: UseSettingsToggleProps) {
  const { dispatch, state } = useLayoutContext().widget;
  const className = 'lk-button lk-settings-toggle';

  const mergedProps = React.useMemo(() => {
    return mergeProps(props, {
      className,
      onClick: () => {
        if (dispatch) dispatch({ msg: 'toggle_settings' });
      },
      'aria-pressed': state?.showSettings ? 'true' : 'false',
    });
  }, [props, className, dispatch, state]);

  return { mergedProps };
}