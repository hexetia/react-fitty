import React from 'react';

// In order to use react-scripts test, we need to "require" fitty instead of importing.
// Otherwise, react-scripts test will result in error messages saying
// SyntaxError: Unexpected token 'export'
// This error stems from trying to import the  dist/fitty.module.js rollup file which is
// the fitty package's main file.  Therefore, we need to explicitly require the
// fitty.min.js file instead.
//
// See https://github.com/rikschennink/fitty/issues/76
const fitty = require('fitty/dist/fitty.min.js');

const fullWidth = { width: '100%' };

// todo support style and className on Wrapper(root div) and Ref div
// one solution could be adding style prop for root and another styleProp to ref

/**
 * Snugly resizes text to fit its parent container width
 */
export const ReactFitty = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode; minSize?: number; maxSize?: number; wrapText?: boolean }
>(function ReactFitty(
    { children, minSize = 12, maxSize = 512, wrapText = false, ...rest },
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
        const fitInstance = fitty(effectRef!.current, {
            minSize: minSize,
            maxSize: maxSize,
            multiLine: wrapText,
            observeMutations: {
                subtree: true,
                childList: true,
                characterData: true,
                attributeFilter: ['class'],
            },
        });

        // wait browser finish text width calc with relative properties like rem and %
        // then, fit text in the next animation frame
        // maybe that needed to be handled in fitty?
        setTimeout(() => {
            fitInstance.fit();
        }, 0);

        return () => {
            fitty(effectRef.current!).unsubscribe();
        };
    }, []);

    // fitty need an extra div to avoid parent padding issue
    // see https://github.com/rikschennink/fitty/issues/20
    return (
        <div style={fullWidth}>
            <div {...rest} ref={correctRef as React.MutableRefObject<HTMLDivElement>}>
                {children}
            </div>
        </div>
    );
});
