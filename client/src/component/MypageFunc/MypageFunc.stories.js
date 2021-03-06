import { action } from '@storybook/addon-actions';
import React from 'react';
import MypageFunc from './MypageFunc';

export default {
    title : 'MypageFunc component',
    component: MypageFunc,
};

export const MypageFuncComponent = () => 
    <MypageFunc 
        onClickMenu={action('onClickMenu')}
    />;

MypageFuncComponent.story = {
    name: 'MypageFunc',
};