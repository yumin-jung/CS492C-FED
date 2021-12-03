import React, { useEffect } from 'react';
import PaginationPageList from '../PaginationPageList';
import PaginationArrow from '../PaginationArrow';
import { getAllPost, updateCurrentPage } from '../../actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { GContainer } from './styled';

// eslint-disable-next-line react/prop-types
const Pagination = ({ articlePerPage, postCount, parentComponent }) => {
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.user.currentPage);
    const setCurrentPage = (idx) => {
        dispatch(updateCurrentPage(idx));
    };

    console.log(`postCount = ${postCount}`);
    console.log(`currentPage = ${currentPage}`);

    if(postCount < currentPage * articlePerPage || currentPage < 1) {
        setCurrentPage(1);
    }

    const totalPostNumber = postCount;

    const pagePerPagination = 10;

    const startIndex = ((totalPostNumber === 0) ? 1 : (Math.floor((currentPage - 1) / pagePerPagination) * pagePerPagination + 1));

    const totalPageCount = ((totalPostNumber === 0) ? 1 : (Math.floor((totalPostNumber - 1) / articlePerPage) + 1));
    const totalPagiCount = ((totalPostNumber === 0) ? 1 : (Math.floor((totalPageCount - 1) / pagePerPagination) + 1));

    const currentPagi = ((totalPostNumber === 0) ? 1 : (Math.floor((currentPage - 1) / pagePerPagination) + 1));
    const pageCountInCurrentPagination = ((totalPostNumber === 0) ? 1 :
        ((currentPagi === totalPagiCount ?
            (totalPageCount - (currentPagi - 1) * pagePerPagination)
          : (pagePerPagination))));

    const pagiDoubleLeftEnabled = (currentPagi > 1);
    const pagiSingleLeftEnabled = (currentPage > 1);
    const pagiSingleRightEnabled = (currentPage < totalPageCount);
    const pagiDoubleRightEnabled = (currentPagi < totalPagiCount);

    useEffect(() => {
        dispatch(getAllPost());
    }, []);
    // symbol   : type
    // <<       : DoubleLeft
    // <        : SingleLeft
    // >        : SingleRight
    // >>       : DoubleRight
    return (
        <GContainer>
            <table>
                <tbody>
                    <tr>
                        <PaginationArrow
                            currentPagi={currentPagi}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            pagePerPagi={pagePerPagination}
                            totalPagiCount={totalPagiCount}
                            symbol='<<' type='DoubleLeft'
                            enabled={pagiDoubleLeftEnabled}
                            parentComponent={parentComponent} />
                        <PaginationArrow
                            currentPagi={currentPagi}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            pagePerPagi={pagePerPagination}
                            totalPagiCount={totalPagiCount}
                            symbol='<' type='SingleLeft'
                            enabled={pagiSingleLeftEnabled}
                            parentComponent={parentComponent} />
                        <PaginationPageList
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            start={startIndex}
                            size={pageCountInCurrentPagination}
                            parentComponent={parentComponent} />
                        <PaginationArrow
                            currentPagi={currentPagi}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            pagePerPagi={pagePerPagination}
                            totalPagiCount={totalPagiCount}
                            symbol='>' type='SingleRight'
                            enabled={pagiSingleRightEnabled}
                            parentComponent={parentComponent} />
                        <PaginationArrow
                            currentPagi={currentPagi}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            pagePerPagi={pagePerPagination}
                            totalPagiCount={totalPagiCount}
                            symbol='>>' type='DoubleRight'
                            enabled={pagiDoubleRightEnabled}
                            parentComponent={parentComponent} />
                    </tr>
                </tbody>
            </table>
        </GContainer>
    );
};

export default Pagination;