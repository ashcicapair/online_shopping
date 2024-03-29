import React, {useState, useEffect, useCallback} from 'react';
import { NavLink, useLocation, useSearchParams} from 'react-router-dom';
import { Pagination, PaginationItem, } from '@mui/material';
import axios from 'axios';


const pageSize = 12;
const ProductPagination = ({setProducts, identity, apparelType,}) => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const pageNum = parseInt(query.get('page') || '1', 10);
    const [ pagination, setPagination ] = useState({
        count: 0,
        from: (pageNum - 1) * pageSize,
        to: (pageNum - 1) * pageSize + pageSize,
    });


    useEffect(() => {
        const gettingProductData = async() => {
            
            let apiUrl = "http://127.0.0.1:3001/dev/api/v1/goods";
            if (apparelType) {
                apiUrl =`http://127.0.0.1:3001/dev/api/v1/goods/identity/${identity}/apparelType/${apparelType}`;
            }   else if (identity && !apparelType) {
                apiUrl =`http://127.0.0.1:3001/dev/api/v1/goods/identity/${identity}`;
            } 

            const currentData = await axios.get(apiUrl)  
            .then((response) => response.data)
            .catch((error) => console.log(error));

            const result = currentData &&  currentData.goodsList.length > 0 ? currentData.goodsList.slice(pagination.from, pagination.to) : [];
            setPagination({
                ...pagination,
                count: currentData.goodsList.length,
            });
            setProducts(result);
        };
        gettingProductData();
    
    },[pagination.from, pagination.to, apparelType])
 
    const handlePageChange = (event, page) => {
        const from = (page - 1) * pageSize;
        const to = (page - 1) * pageSize + pageSize;
        setPagination({...pagination, from: from, to: to})
        console.log("2:", 2)
    }

    return (
        <Pagination
            showFirstButton 
            showLastButton 
            size="large"
            page={pageNum}
            count={Math.ceil(pagination.count / pageSize)}
            onChange={handlePageChange}
            renderItem={(item) => (
                <PaginationItem
                    disableRipple
                    component={NavLink}
                    to={`/newArrivals${item.page === 1 ? '' : `?page=${item.page}`}`}
                    {...item}
                />
            )}
        />
    )
}

export default ProductPagination;