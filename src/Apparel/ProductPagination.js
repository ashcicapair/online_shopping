import React, {useState, useEffect, } from 'react';
import { NavLink, useLocation, useSearchParams} from 'react-router-dom';
import { Pagination, PaginationItem, } from '@mui/material';
import useProductDataApi from './useProductDataApi';
import axios from 'axios';


const pageSize = 3;
const ProductPagination = ({setProducts}) => {
    // const [productData, getProductData] = useProductDataApi();
    // const [productData, setProductData] = useState([]);
    const [ pagination, setPagination ] = useState({
        count: 0,
        from: 0,
        to: pageSize
    });
    

    useEffect(() => {
        const gettingProductData = async() => {
            const currentData = await axios.get('http://127.0.0.1:3001/dev/api/v1/goods')
                .then((response) => response.data)
                .catch( (error) => console.log(error));
            
            const result = currentData &&  currentData.goodsList.length > 0 ? currentData.goodsList.slice(pagination.from, pagination.to) : [];
            console.log("productData:", result)
            setPagination({
                ...pagination,
                count: currentData.goodsList.length
            });
            setProducts(result);
        };
        gettingProductData();
        // const data = productData.slice(pagination.from, pagination.to);
        // console.log("productData:", data)

        // getData({from: pagination.from, to: pagination.to}).then(response => {
        // console.log("response:",response)
        //     setPagination({
        //         ...pagination,
        //         count: response.count
        //     });
        //     setProducts(response.data);
        // })
    },[pagination.from, pagination.to])
    // console.log("products:",products)
    
    const handlePageChange = (event, page) => {
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
            page={page}
            count={Math.ceil(pagination.count / pageSize)}
            onChange={handlePageChange}

            renderItem={(item) => (
                <PaginationItem
                    disableRipple
                    component={NavLink}
                    to={`/newArrivals${item.page === 1 ? '' : `?page=${item.page}`}`}
                    // onClick={e=> setSearchParams({page: e.target.value})}
                    // onChange={handlePageChange}
                    {...item}
                />
            )}
        />
    )
}

export default ProductPagination;