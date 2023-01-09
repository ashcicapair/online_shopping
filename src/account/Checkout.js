import React, {useState, useEffect, useCallback} from 'react';
import {useParams, NavLink, useNavigate} from 'react-router-dom';
import { 
    Container, Box, TextField, Typography, Button, ButtonBase, Grid, styled, 
    FormControl, FormLabel, FormGroup, FormControlLabel, FormHelperText, Radio, RadioGroup,
    IconButton, Divider, Select, Stack, Card, CardMedia, CardContent, MenuItem, Checkbox,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from './useAuth'; 
import  {StyledContainer} from '../Apparel/Apparel';
import Alarm from '../Alarm';
import ClearIcon from '@mui/icons-material/Clear';


const StyledTextField = styled(TextField, {
    name: "StyledTextField",
    })({
        '& .MuiOutlinedInput-root':{borderRadius:0,}, 
        '& .MuiOutlinedInput-root:hover':{
            "& > fieldset": {border:'1px solid #44465e'}
        },
        '& .MuiOutlinedInput-root.Mui-focused':{
            "& > fieldset": {border:'1px solid #44465e'}
        }
});

const initialValues = {
    "cartId": 1,
    "goodsId": 1,
    "size": "L",
    "count": 2,
    "title": "男裝 特級極輕羽絨連帽外套(3D剪裁) 449722",
    "descript": {
        "text": "descript text",
        "material": "material",
        "washingGuide": "washing guide"
    },
    "identity": "men",
    "apparelType": "coat",
    "price": 1190,
    "image": "w1",
    "sizeRemains": 5
};


const Checkout = () => {
    const [cart, setCart] = useState([initialValues]);
    const [orderItems, setOrderItems] = useState([]);
    const [checkoutInfo, setCheckoutInfo] = useState({
        "payment": '',
        "shipping": '',
        "subtotal": '--'
    });
    const [selected, setSelected] = useState([]);
    const [selectAll, setSelectAll] = useState({
        "selected": true,
        "indeterminate": false,
    });
    const [alarmStatus, setAlarmStatus] = useState({
        "open": false,
        "content": '',
    });
    const navigate = useNavigate();
    const {token} = useAuth();
    console.log('orderItems:',orderItems)
    // console.log('selected:', selected);
    // console.log('selectAll:', selectAll.selected);
    // console.log('checkoutInfo:', checkoutInfo);

    
    const handleClose = () => {
        setAlarmStatus({
            ...alarmStatus,
            "open": false,
        });
    };

    const handleCheckoutInfo = (e) => {
        const {name, value,} = e.target;
        setCheckoutInfo({
            ...checkoutInfo,
            [name]: value,
        });
    };

    const handleSelectAll = (event) => {
        const {checked, value,} = event.target;
        if (checked) {
            setOrderItems([...cart]);
        } else {
            setOrderItems([]);
        };
    };

    const handleCheckItem = (event, index) => {
        const {checked, value,} = event.target;
        let checkedArr = selected;
        const checkedItem = orderItems;
        if (value === 'selectAll') {
            // if (checked) {
            //     setOrderItems();
            // } else {
            //     setOrderItems([...cart]);
            // };


            let allSelected = checkedArr.every((item) => item === true);
            if (allSelected) {
                checkedArr.fill(false);
                setSelectAll({
                    "selected": false,
                    "indeterminate": false
                });
                setCheckoutInfo({
                    ...checkoutInfo,
                    "subtotal": 0
                });
                setSelected([...checkedArr]);
            } else {
                checkedArr.fill(true);
                setSelectAll({
                    "selected": true,
                    "indeterminate": false
                });
                setOrderItems([...cart]);
                setSelected([...checkedArr]);
            };
        } else {
            if (checked) {
                let itemIndex = checkedItem.map((item) => item.cartId).indexOf(parseInt(value));
                checkedItem.splice(itemIndex, 1);
                setOrderItems([...checkedItem]);
            } else {
                checkedItem.push(cart[index]);
                setOrderItems([...checkedItem]);
            };


            // checkedArr[index] = checked;
            // setSelected([...checkedArr]);
            // let allSelected = checkedArr.every((item) => item === true);
            // let noneSelected = checkedArr.every((item) => item === false);
            // if (allSelected) {
            //     setSelectAll({
            //         "selected": true,
            //         "indeterminate": false
            //     });
            // } else if (noneSelected) {
            //     setSelectAll({
            //         "selected": false,
            //         "indeterminate": false
            //     });
            // } else {
            //     setSelectAll({
            //         "selected": false,
            //         "indeterminate": true
            //     });
            // };

            // let existed = checkedItem.map((item) => item.cartId).includes(parseInt(value));
            // if (!existed) {
            //     checkedItem.push(cart[index]);
            //     setOrderItems([...checkedItem]);
            // } else if (existed) {
            //     let itemIndex = checkedItem.map((item) => item.cartId).indexOf(parseInt(value));
            //     checkedItem.splice(itemIndex, 1);
            //     setOrderItems([...checkedItem]);
            // };
        };
    };

    const showAmount = (cartItems) => {
        let subtotal = 0;
        if (cartItems.length > 0) {
            subtotal = cartItems.map(item => item.price * item.count).reduce((prev, next) => prev += next);
        }
        setCheckoutInfo({
            ...checkoutInfo,
            "subtotal": subtotal
        });
    };

    const handleQtyChange = async(event, cartId, index) => {
        const changeGoodsQty = await axios.put(`http://127.0.0.1:3001/dev/api/v1/carts/${cartId}`,
            {
                "count": event.target.value
            },
            {
                headers: {
                    'accept': '*/*',
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(response => response.status)
        .catch(error => error.response)

        if (changeGoodsQty === 200) {
            let item = cart[index];
            item.count = event.target.value;
            setCart([...cart]);
            showAmount(cart);
        } else if (changeGoodsQty.data.message === "The goods do not have enough inventory.") {
            setAlarmStatus({
                "open": true,
                "content": '庫存不足'
            });
        } else {
            setAlarmStatus({
                "open": true,
                "content": '系統錯誤'
            });
        }
    };

    const removeFromCart = async(cartId, index) => {
        const removeItem = await axios.delete(`http://127.0.0.1:3001/dev/api/v1/carts/${cartId}`,
            {
                headers: {
                    'accept': '*/*',
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        .then(response => response)
        .catch(error => error.response)
        
        if (removeItem.status === 204) {
            let remainItems = cart.filter(item => item.cartId !== cartId);
            setCart([...remainItems]);
            setOrderItems([...remainItems]);

            let checkedArr = selected;
            checkedArr.splice(index, 1);
            setSelected([...checkedArr]);
        } else {
            setAlarmStatus({
                "open": true,
                "content": '系統錯誤'
            });
        };
    };

    const submitOrder = async() => {
        let orderGoodId = orderItems.map((item) => item.cartId);
        const checkout = await axios.post(`http://127.0.0.1:3001/dev/api/v1/carts/checkout`,
            {
                "cartIds": [...orderGoodId]
            },
            {
                headers: {
                    'accept': '*/*',
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(response => response)
        .catch(error => error.response)

        if (checkout.status === 200) {
            setAlarmStatus({
                "open": true,
                "content": '成功送出訂單'
            });
            setTimeout(() => 
                navigate("/account/profile")
            , 1500);
        } else if (checkout.status === 400) {
            setAlarmStatus({
                "open": true,
                "content": '請勿選取庫存不足的商品'
            });
        } else if (checkout.status === 401) {
            setAlarmStatus({
                "open": true,
                "content": '請重新登入'
            });
            setTimeout(() => 
                navigate("/signin")
            , 500);
        } else {
            setAlarmStatus({
                "open": true,
                "content": '系統錯誤'
            });
        }
        console.log('checkout:',checkout);
    };

    useEffect (() => {
        const getCartByUserId = async(e) => {
            const gettingCart = await axios.get('http://127.0.0.1:3001/dev/api/v1/carts',
                {
                    headers: {
                        'accept': 'application/json',
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            .then(response => response)
            .catch(error => error)

            if (gettingCart.status === 200) {
                setCart([...gettingCart.data.cartGoods]);
                setOrderItems([...gettingCart.data.cartGoods]);
                let cartLength = Array.from({length: gettingCart.data.cartGoods.length}, (_, i) =>  i);
                cartLength.fill(true);
                setSelected(cartLength);
            } else if (gettingCart.status === 401) {
                setAlarmStatus({
                    "open": true,
                    "content": '請重新登入'
                });
                setTimeout(() => 
                    navigate("/signin")
                , 500);
            } else {
                setAlarmStatus({
                    "open": true,
                    "content": '系統錯誤'
                });
            };
        };

        getCartByUserId();
    }, []);

    useEffect (() => {
        if (checkoutInfo.payment === 'cashDelivery') {
            setCheckoutInfo({
                ...checkoutInfo,
                "shipping": "宅配 Home Delivery"
            });
        } else if (checkoutInfo.payment === 'cashCVS') {
            setCheckoutInfo({
                ...checkoutInfo,
                "shipping": "超商取貨 CVS Pickup Service"
            });
        } 
    }, [checkoutInfo.payment]);

    useEffect (() => {
        showAmount(orderItems);
    }, [orderItems]);

  
    // console.log('orderItems:',orderItems.length)
    // console.log('cart:',cart.length)
    // console.log('?:',orderItems.length === cart.length)

    return (
        <>
            <StyledContainer maxWidth="false" disableGutters sx={{pt:"124px", bgcolor:'#ebeff0',}}>
                <Divider />
                <Container component="main" maxWidth="xl" sx={{display:'flex', pt:10, minHeight: '83vh', overflow:"hidden"}}>
                    <Grid container xs={12} md={7} pt={6} pb={10} mb={10} bgcolor='#fff' justifyContent='center' position='relative'>
                        <Typography variant="h6" color="#44465e" sx={{position:'absolute', left:'5%', borderBottom:'1.5px solid #44465e'}}>{cart.length === 0 ? "Your bag is empty." : "Your Bag"}</Typography>
                        {cart.length === 0 ? '' :
                            <FormControlLabel
                                label="Select All"
                                value='selectAll'
                                sx={{position:'absolute', top:'7%', right:'6%', color:"#9c8f83"}}
                                control={
                                    <Checkbox
                                        checked={(orderItems.length === cart.length)}
                                        indeterminate={orderItems.length !== 0 && orderItems.length !== cart.length}
                                        disableRipple 
                                        defaultChecked 
                                        onClick={handleSelectAll}
                                        sx={{color:"#9c8f83", '&.Mui-checked': { color:'#9c8f83'}, '&.MuiCheckbox-indeterminate': { color:'#9c8f83'}}} 
                                    />
                                }
                            />
                        }
                        {
                            cart.map((item, index) => (
                                <Box pt={9} sx={{width:'90%', borderBottom: 1, borderColor: 'divider',}}>
                                    <Card elevation={0} sx={{display:'flex', marginBottom:'20px', height:'150px',}}>
                                        <Grid item xs={12} md={6} lg={1}>
                                            <FormControl sx={{height:'100%', top:'35%'}} >
                                                <FormGroup onChange={(event) => handleCheckItem(event, index)} >
                                                    <FormControlLabel
                                                        aria-label="cartItem"
                                                        value={item.cartId}
                                                        control={
                                                            <Checkbox 
                                                                disableRipple 
                                                                defaultChecked 
                                                                checked={orderItems.map((item) => item.cartId).includes(parseInt(item.cartId))}
                                                                sx={{color:"#9c8f83", '&.Mui-checked': { color:'#9c8f83'}}} 
                                                            />
                                                        }
                                                    />
                                                </FormGroup>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <CardMedia
                                                component="img"
                                                image={require(`../images/${item.image}.jpg`)}
                                                alt={item.title}
                                                sx={{ display: { xs: 'none', sm: 'block' },}}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={5} >
                                            <CardContent>
                                                <Box display='flex' flexDirection='column' justifyContent='space-between' height='118px'>
                                                    <NavLink to={`/shop/?goodsId=${item.goodsId}`} style={{textDecoration:'none'}}>
                                                        <Typography component="h1" variant="subtitle1" sx={{color:'#1a1a1a'}}>{item.title}</Typography>
                                                    </NavLink>
                                                    <Typography component="h1" variant="subtitle1">尺寸: {item.size}</Typography>
                                                </Box>
                                            </CardContent>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <CardContent>
                                                <Box display='flex' flexDirection='column' justifyContent='flex-end' height='118px'>
                                                    <IconButton disableRipple sx={{display:'flex', justifyContent:'flex-end', mb:2, pr:0, color:'#a7aaab', '&:hover':{color:'#9c8f83'}}}>
                                                        <ClearIcon onClick={() => removeFromCart(item.cartId, index)}/>
                                                    </IconButton>
                                                    <FormControl size="small" error={item.sizeRemains === 0 ? true : false}>
                                                        <Select 
                                                            id="qty" 
                                                            name="qty"
                                                            variant="standard"
                                                            value={item.count}
                                                            disabled={item.sizeRemains === 0 ? true : false}
                                                            onChange={(event) => handleQtyChange(event, item.cartId, index)} 
                                                            sx={{
                                                                '& .MuiSelect-select': {
                                                                    pl:'45%'
                                                                },
                                                                '&.MuiInput-root::after': {
                                                                    borderBottom:'1px solid #44465e',
                                                                },
                                                            }} 
                                                            displayEmpty 
                                                            renderValue={(item) => item ? item : <text >1</text>}
                                                            MenuProps={{ PaperProps: { style: { maxHeight: '33%' } } }}
                                                        >
                                                            { 
                                                                Array.from({length: 20}, (_, index) => {
                                                                    return  <MenuItem value={index+1} dense sx={{ pl:'50%'}}>
                                                                                { index+1 }
                                                                            </MenuItem>
                                                                })
                                                            }
                                                        </Select>
                                                        <FormHelperText >{item.sizeRemains === 0 ? '暫無庫存' : ''}</FormHelperText>
                                                    </FormControl>
                                                    <Typography component="h1" variant="subtitle1" align='right'>NT$ {item.price}</Typography>
                                                </Box>
                                            </CardContent>
                                        </Grid> 
                                    </Card>
                                </Box>
                            ))
                        }
                    </Grid>

                    {cart.length === 0 ? '' :
                        <Grid container xs={12} md={5} px={8} py={9} mb={10} overflow="hidden" height='100%'>
                            {/* <Box width='100%' component="form" onSubmit={submitOrder}> */}
                                <Grid item xs={12}>
                                    <FormControl sx={{display:'flex', flexDirection:'row',  height:'40px',}}>
                                        <StyledTextField variant="outlined" size="small" placeholder="Promotion Code" fullWidth/>
                                        <Button 
                                            variant="contained" 
                                            sx={{
                                                marginLeft:2, 
                                                width: "80px", 
                                                borderRadius:0, 
                                                border:'1px solid #44465e', 
                                                color: '#44465e', 
                                                bgcolor:'transparent', 
                                                '&:hover':{
                                                    color: '#9c8f83', 
                                                    border:'1px solid #9c8f83',
                                                    bgcolor:'transparent'
                                                }
                                            }} 
                                            disableElevation 
                                            disableRipple
                                        >
                                            APPLY
                                        </Button>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} my={3} >
                                    <Divider color='#bdad9f'/>
                                </Grid> 
                                <Stack sx={{display:'flex', flexDirection:'row', }} >
                                    <Grid item xs={12} lg={6}>
                                        <Typography variant='subtitle1' color="#44465e" fontWeight='bold'>
                                            Payment Options 付款方式
                                        </Typography>  
                                    </Grid> 
                                    <Grid item xs={12} lg={6} sx={{display:'flex', justifyContent:'flex-end'}}>
                                        <FormControl variant="standard" required>
                                            <RadioGroup name="payment" onChange={handleCheckoutInfo}> 
                                                <FormControlLabel
                                                    label="信用卡" 
                                                    value="creditCard"
                                                    control={
                                                        <Radio color="default"/>
                                                    }
                                                />
                                                <FormControlLabel
                                                    label="取貨付款(超商)" 
                                                    value="cashCVS"
                                                    control={
                                                        <Radio color="default"/>
                                                    }
                                                />
                                                <FormControlLabel
                                                    label="取貨付款(宅配)"
                                                    value="cashDelivery"
                                                    control={
                                                        <Radio color="default"/>
                                                    }
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </Stack>
                                <Grid item xs={12} my={3}>
                                    <Divider color='#bdad9f'/>
                                </Grid> 
                                <Stack sx={{display:'flex', flexDirection:'row', }}>
                                    <Grid item xs={12} lg={6}>
                                        <Typography variant='subtitle1' color="#44465e" fontWeight='bold'>
                                            Shipping Options 運送方式
                                        </Typography>  
                                    </Grid> 
                                    <Grid item xs={12} lg={6} >
                                        <Select 
                                            id="shipping" 
                                            name="shipping"
                                            variant="standard"
                                            disabled={checkoutInfo.payment !== 'creditCard' && true}
                                            fullWidth
                                            value={checkoutInfo.shipping}  
                                            onChange={checkoutInfo.payment === 'creditCard' && handleCheckoutInfo} 
                                            sx={{
                                                mb:2, 
                                                '& .MuiSelect-select': {
                                                    pl:'10%'
                                                },
                                                '&.MuiInput-root::after': {
                                                    borderBottom:'none',
                                                },
                                                '&.MuiInput-root::before': {
                                                    '&:hover': {
                                                    borderBottom:'none',}
                                                },
                                            }} 
                                            displayEmpty
                                            renderValue={(item) => item ? item : <text >超商取貨 CVS Pickup Service</text>}
                                            MenuProps={{ PaperProps: { style: { maxHeight: '33%' } } }}
                                        >
                                            <MenuItem value='超商取貨 CVS Pickup Service' dense sx={{ pl:'5%'}}>
                                                超商取貨 CVS Pickup Service
                                            </MenuItem>
                                            <MenuItem value='宅配 Home Delivery' dense sx={{ pl:'5%'}}>
                                                宅配 Home Delivery
                                            </MenuItem>
                                        </Select>
                                    </Grid> 
                                </Stack>

                                { checkoutInfo.shipping === '超商取貨 CVS Pickup Service' 
                                    ? 
                                        <Grid item xs={12} display='flex' justifyContent='flex-end'>
                                            <ButtonBase 
                                                variant="outlined"  
                                                disableRipple
                                                sx={{
                                                    border:'1px solid #44465e', 
                                                    height: 39, 
                                                    width: "200px",
                                                    "&:hover": {
                                                        color: '#9c8f83',
                                                        borderColor: '#9c8f83'
                                                    }
                                                }}
                                            >
                                                SELECT STORE
                                            </ButtonBase>
                                        </Grid> 
                                    : 
                                        <Grid item xs={12}> 
                                            <StyledTextField
                                                variant="outlined"
                                                name="receipient"
                                                margin='normal'
                                                size="small" 
                                                // value={inputValues.accountID}
                                                // fullWidth
                                                placeholder='Receipient 收件人姓名'
                                                // onChange={handleInputChange}
                                            />
                                            <StyledTextField
                                                variant="outlined"
                                                name="shipping-address"
                                                margin='normal'
                                                size="small" 
                                                // value={inputValues.accountID}
                                                fullWidth
                                                placeholder='Shipping Address 收件地址'
                                                // onChange={handleInputChange}
                                            />
                                        </Grid>
                                }
                                <Grid item xs={12} my={3}>
                                    <Divider color='#bdad9f'/>
                                </Grid> 
                                <Grid item xs={12} lg={6}>
                                    <Typography variant='subtitle1' color="#44465e" fontWeight='bold'>
                                        Subtotal 總金額
                                    </Typography>  
                                </Grid> 
                                <Grid item xs={12} lg={6} sx={{display:'flex', justifyContent:'flex-end'}}>
                                    <Typography variant='subtitle1' color="#44465e" fontWeight='bold'>
                                        NT$  {checkoutInfo.subtotal}
                                    </Typography>  
                                </Grid> 
                                <Grid item xs={12} mt={3}>
                                    <ButtonBase 
                                        variant="outlined"  
                                        // type="submit"
                                        onClick={submitOrder}
                                        disableRipple
                                        sx={{
                                            border:'1px solid #44465e', 
                                            color: '#44465e',
                                            height: 45, 
                                            width: "100%",
                                            "&:hover": {
                                                border: 'none',
                                                color: '#fff',
                                                bgcolor: '#9c8f83'
                                            }
                                        }}
                                    >
                                        SUBMIT ORDER
                                    </ButtonBase>
                                </Grid>
                            {/* </Box> */}
                        </Grid>
                    }
                </Container>
                <Alarm open={alarmStatus.open} onClose={handleClose}>
                    {alarmStatus.content}
                </Alarm>
            </StyledContainer>
        </>
    )
}

export default Checkout;