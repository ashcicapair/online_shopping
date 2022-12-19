import React, {useState, useEffect, } from 'react';
import { NavLink, useLocation, useSearchParams} from 'react-router-dom';
import { Pagination, PaginationItem, } from '@mui/material';
import useProductDataApi from './useProductDataApi';


const pageSize = 3;
const ProductPagination = ({setProducts,}) => {
    const [productData, getProductData] = useProductDataApi();
    const [ pagination, setPagination ] = useState({
        count: 0,
        from: 0,
        to: pageSize
    });
    
    useEffect (() => {
        async function fetchData() {
            await getProductData();
        }
        fetchData();
    },[]);


    const getData = ({from, to}) => {
            return new Promise((resolve, reject) => {
                const data = productData.slice(from, to);
                resolve({
                    count: productData.length,
                    data: data
                })
            });
        }


    console.log("productData:",productData)

    useEffect(() => {
        const data = productData.slice(pagination.from, pagination.to);
        getData({from: pagination.from, to: pagination.to}).then(response => {
        console.log("response:",response)
            setPagination({
                ...pagination,
                count: response.count
            });
            setProducts(response.data);
        })
    },[pagination.from, pagination.to])
    // console.log("products:",products)
    
    const handlePageChange = ({event, page}) => {
        const from = (page - 1) * pageSize;
        const to = (page - 1) * pageSize + pageSize;
        setPagination({...pagination, from: from, to: to})
        console.log("5:",page)
    }

    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);

    return (
        <Pagination
            showFirstButton 
            showLastButton 
            size="large"
            // page={page}
            count={Math.ceil(pagination.count / pageSize)}
           
            renderItem={(item) => (
                <PaginationItem
                    disableRipple
                    component={NavLink}
                    to={`/newArrivals${item.page === 1 ? '' : `?page=${item.page}`}`}
                    // onClick={e=> setSearchParams({page: e.target.value})}
                    onChange={handlePageChange}
                    {...item}
                />
            )}
        />
    )
}

export default ProductPagination;