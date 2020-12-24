import React from 'react';
import fitty from 'fitty';

// todo automatically upgrade fitty version and publish a new package version if tests pass
/**
 * TODO Add tests
 * TODO publish as a npm package
 * Snugly resizes text to fit its parent container width
 *
 * @param props
 * @constructor
 */
export const ReactFitty: React.ForwardRefExoticComponent<any> = React.forwardRef<unknown>(function ReactFitty(
    { children, ...rest },
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
            minSize: 16,
            maxSize: 512,
            multiLine: true,
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
