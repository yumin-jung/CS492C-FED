/* eslint-disable react/prop-types */
import Header from '../../component/Header';
import React from 'react';
import { GroundContainer} from '../PostMain/styled';
import MypageFunc from '../../component/MypageFunc/MypageFunc';
import PageNumSelector from '../../component/PageNumSelector';

/**
 * - page 항목에 포함된 컴포넌트이며 MyPage의 상위 컴포넌트입니다.   
 * - MyPostList와 PageNumSelector 컴포넌트를 하위 컴포넌트로 가집니다.
 */
const MyPagePost = ({ match }) => {
    const thiscomponent = 'MyPagePost';
    const { pageNO } = match.params;
    
    return (
        <GroundContainer>
            <Header mypage={true} />
            <MypageFunc />
            <PageNumSelector pageNO={pageNO} parentComponent={thiscomponent}/>
        </GroundContainer>
    )
};

export default MyPagePost;