import React from 'react';

export default (props) => {
    console.log(`p1 props :`, props);
    return (
        <div style={{
            background: 'pink'
        }}>
            This is the &lt;PageOne /&gt; component
        </div>
    );
};
