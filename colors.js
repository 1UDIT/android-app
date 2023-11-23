const commonColor = {
    commonWhite: '#FFFFFF',
    commonBlack: '#000000',
    activeColor: '#DE5E69',
    deactiveColor: '#DE5E6950',
    boxActiveColor: '#DE5E6940',
};

export const light = {
    dark: false,
    colors: {
        primary: 'rgb(255, 45, 85)',
        background: 'rgb(242, 242, 242)',
        card: 'rgb(255, 255, 255)',
        headerStyle:'rgb(255, 255, 255)',
        text: '#FF595A',
        Activetext:'#f5610a',
        InActivetext:'#555',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};


export const dark = {
    dark: true,
    colors: {
        primary: 'rgb(255, 45, 85)',
        background: 'black',
        card: '#7a7a7a',
        headerStyle:'#2986ff',
        text: 'rgb(255, 255, 255)',
        Activetext:'black',
        InActivetext:'rgb(255, 255, 255)',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

export default { light, dark };