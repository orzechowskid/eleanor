import React from 'react';

function onClick(router) {
    return function onClick() {
        router.setLocation(`/three`);
    };
}

export default (props) => {
    console.log(`p2 props:`, props);
    return (
        <div style={{
            background: 'orange'
        }}>
            <div>
                This is the &lt;PageTwo /&gt; component
            </div>
            <button onClick={onClick(props.router)}>click me to go to page 3</button>
        </div>
    );
};
