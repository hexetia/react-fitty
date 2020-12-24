import React from 'react';
import fitty from 'fitty';

// todo automatically upgrade fitty version and publish a new package version if tests pass
// todo add gifs showing what react-fitty can do
/**
 * Snugly resizes text to fit its parent container width
 */
export const ReactFitty = React.forwardRef<HTMLElement, { minSize?: number; maxSize?: number; multiLine?: boolean }>(function ReactFitty(
    { children, minSize = 12, maxSize = 512, multiLine = true, ...rest },
    ref: React.MutableRefObject<any> | ((instance: any) => void) | null
) {
    const internalRef = React.useRef<HTMLDivElement>(null);

    /**
     * Need to use the correct ref because the component ref can contain a className that dynamically
     * change the text size
     */
    const correctRef = (ref as React.MutableRefObject<HTMLDivElement>) || internalRef;

    React.useLayoutEffect(() => {
        const effectRef = (ref as React.MutableRefObject<HTMLDivElement>) || internalRef;
        fitty(effectRef!.current, {
            minSize: minSize,
            maxSize: maxSize,
            multiLine: multiLine,
            observeMutations: {
                subtree: true,
                childList: true,
                characterData: true,
                attributeFilter: ['class'],
            },
        }).fit();

        return () => {
            fitty(effectRef.current!).unsubscribe();
        };
    }, []);

    // fitty need an extra div to avoid parent padding issue
    // see https://github.com/rikschennink/fitty/issues/20
    return (
        <div>
            <div {...rest} ref={correctRef as React.MutableRefObject<HTMLDivElement>}>
                {children}
            </div>
        </div>
    );
});
