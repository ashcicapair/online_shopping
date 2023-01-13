import React, {useState, useEffect} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import { 
    Container, Box, TextField, Typography, Button, ButtonBase, Grid, styled, 
    FormControl, FormGroup, FormControlLabel, FormHelperText, Radio, RadioGroup,
    IconButton, Divider, Select, Stack, Card, CardMedia, CardContent, MenuItem, Checkbox,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../account/useAuth'; 
import  {StyledContainer} from '../apparel/Apparel';
import Alarm from '../Alarm';
import ClearIcon from '@mui/icons-material/Clear';
// import useShoppingCart from '../ShoppingCart/useShoppingCart';



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
    // const [cartItem, getCartByUserId] = useShoppingCart();
    const [orderItems, setOrderItems] = useState([]);
    const [promoCode, setPromoCode] = useState('');
    const [checkoutInfo, setCheckoutInfo] = useState({
        "payment": '',
        "shipping": '',
        "receipient": '',
        "address": '',
        "promoCode": '',
        "subtotal": '--'
    });
    const [inputError, setInputError] = useState({});
    const [alarmStatus, setAlarmStatus] = useState({
        "open": false,
        "content": '',
        "needRefresh": false
    });
    const navigate = useNavigate();
    const {token, logout} = useAuth();

    
    const handleClose = () => {
        setAlarmStatus({
            ...alarmStatus,
            "open": false,
        });
    };

    const handlePromoCode = (e) => {
        setPromoCode(e.target.value);
    };

    const handleCheckoutInfo = (e) => {
        const {name, value} = e.target;
        if (name === 'promoCode') {
            if (promoCode === "sale") {
                setCheckoutInfo({
                    ...checkoutInfo,
                    "promoCode": promoCode,
                });
                setPromoCode('');
            };
        } else {
            setCheckoutInfo({
                ...checkoutInfo,
                [name]: value,
            });
        };
    };

    const handleSelectAll = (event) => {
        const {checked} = event.target;
        if (checked) {
            setOrderItems([...cart]);
        } else {
            setOrderItems([]);
        };
        setCheckoutInfo({
            ...checkoutInfo,
            "promoCode": '',
        });
    };

    const handleCheckItem = (event, index) => {
        const {checked, value,} = event.target;
        const checkedItem = orderItems;
        if (checked) {
            checkedItem.push(cart[index]);
            setOrderItems([...checkedItem]);
        } else {
            let itemIndex = checkedItem.map((item) => item.cartId).indexOf(parseInt(value));
            checkedItem.splice(itemIndex, 1);
            setOrderItems([...checkedItem]);
            
        };
        setCheckoutInfo({
            ...checkoutInfo,
            "promoCode": '',
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
        } else {
            setAlarmStatus({
                "open": true,
                "content": '系統錯誤'
            });
        };
    };

    const submitOrder = async() => {
        let orderGoodId = orderItems.map((item) => item.cartId);
        if (validation()) {
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

            if (checkout.status) {
                if (checkout.status === 200) {
                    setAlarmStatus({
                        "open": true,
                        "content": '成功送出訂單',
                        "needRefresh": true
                    });
                } else if (checkout.status === 400) {
                    setAlarmStatus({
                        "open": true,
                        "content": '請勿選取庫存不足的商品'
                    });
                } else if (checkout.status === 401) {
                    logout();
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
            } else {
                logout();
                setAlarmStatus({
                    "open": true,
                    "content": '請重新登入'
                });
                setTimeout(() => 
                    navigate("/signin")
                , 1500);
            };
        };
    };

    const showAmount = (cartItems) => {
        let subtotal = 0;
        if (cartItems.length > 0) {
            subtotal = cartItems.map(item => item.price * item.count).reduce((prev, next) => prev += next);
            if (checkoutInfo.promoCode) {
                subtotal = Math.round(subtotal * 0.8);
            };
        };
        setCheckoutInfo({
            ...checkoutInfo,
            "subtotal": subtotal,
        });
    };

    const validation = () => {
        let temp = {};
        temp.payment = checkoutInfo.payment === '' ? '請選擇付款方式' : '';
        temp.shipping = checkoutInfo.shipping === '' ? '請選擇運送方式' : '';
        if (checkoutInfo.shipping === '宅配 Express') {
            temp.receipient =  checkoutInfo.receipient === '' ? '請填入收件人' : '';
            temp.address = checkoutInfo.address === '' ? '請填入收件地址' : '';
        };

        setInputError({
            ...temp
        });

        return Object.values(temp).every(x => x === "");
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

            if (gettingCart.status) {
                if (gettingCart.status === 200) {
                    setCart([...gettingCart.data.cartGoods]);
                    setOrderItems([...gettingCart.data.cartGoods]);

                } else if (gettingCart.status === 401) {
                    logout();
                    setAlarmStatus({
                        "open": true,
                        "content": '請重新登入'
                    });
                    setTimeout(() => 
                        navigate("/signin")
                    , 1500);
                } else {
                    setAlarmStatus({
                        "open": true,
                        "content": '系統錯誤'
                    });
                };
            } else {
                logout();
                setAlarmStatus({
                    "open": true,
                    "content": '請重新登入'
                });
                setTimeout(() => 
                    navigate("/signin")
                , 1500);
            };
        };

        getCartByUserId();
    }, []);

    useEffect (() => {
        if (checkoutInfo.payment === 'cashDelivery') {
            setCheckoutInfo({
                ...checkoutInfo,
                "shipping": "宅配 Express"
            });
        } else if (checkoutInfo.payment === 'cashCVS') {
            setCheckoutInfo({
                ...checkoutInfo,
                "shipping": "超商取貨 CVS Pickup"
            });
        }; 
    }, [checkoutInfo.payment]);

    useEffect (() => {
        showAmount(orderItems);
    }, [orderItems, checkoutInfo.promoCode]);

    useEffect (() => {
        setInputError({});
    }, [checkoutInfo]);

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
                                sx={{position:'relative', top:'0%', right:'-38%', color:"#9c8f83"}}
                                control={
                                    <Checkbox
                                        checked={(orderItems.length === cart.length)}
                                        indeterminate={orderItems.length !== 0 && orderItems.length !== cart.length}
                                        disableRipple 
                                        onClick={handleSelectAll}
                                        sx={{color:"#9c8f83", '&.Mui-checked': { color:'#9c8f83'}, '&.MuiCheckbox-indeterminate': { color:'#9c8f83'}}} 
                                    />
                                }
                            />
                        }
                        {
                            cart.map((item, index) => (
                                <Box pt={4} sx={{width:'90%', borderBottom: 1, borderColor: 'divider',}}>
                                    <Card elevation={0} sx={{pt:3,display:'flex', marginBottom:'35px', height:'150px',}}>
                                        <Grid item xs={12} md={6} lg={1}>
                                            <FormControl sx={{height:'100%', top:'35%'}} >
                                                <FormGroup onClick={(event) => handleCheckItem(event, index)} >
                                                    <FormControlLabel
                                                        aria-label="cartItem"
                                                        value={item.cartId}
                                                        control={
                                                            <Checkbox 
                                                                disableRipple 
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
                                                    <FormControl size="small" error={item.count > item.sizeRemains ? true : false}>
                                                        <Select 
                                                            id="qty" 
                                                            name="qty"
                                                            variant="standard"
                                                            value={item.count}
                                                            disabled={item.count > item.sizeRemains ? true : false}
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
                                                            renderValue={(item) => item ? item : <Typography >1</Typography>}
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
                                                        <FormHelperText >{item.count > item.sizeRemains ? `暫無庫存，剩餘${item.sizeRemains}件` : ''}</FormHelperText>
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
                            <Grid item xs={12} >
                                <FormControl sx={{display:'flex', flexDirection:'row', height:'40px',}} onClick={handleCheckoutInfo}>
                                    <StyledTextField variant="outlined" name="promoCode" value={promoCode} size="small" placeholder="Promotion Code" fullWidth onChange={handlePromoCode}/>
                                    <Button 
                                        variant="contained" 
                                        name="promoCode"
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
                                    <FormHelperText>{checkoutInfo.promoCode ? `Promotion Code : ${checkoutInfo.promoCode}` : ''}</FormHelperText>
                            </Grid>
                            <Grid item xs={12} my={3} >
                                <Divider color='#bdad9f'/>
                            </Grid> 
                            <Stack sx={{display:'flex', flexDirection:'row', width:'100%'}}>
                                <Grid item xs={12} lg={6}>
                                    <Typography variant='subtitle1' color="#44465e" fontWeight='bold'>
                                        Payment Options 付款方式
                                    </Typography>  
                                </Grid> 
                                <Grid item xs={12} lg={6} display='flex' justifyContent='flex-end'>
                                    <FormControl variant="standard" onClick={handleCheckoutInfo}>
                                        <RadioGroup name="payment"> 
                                            <FormControlLabel
                                                label="信用卡" 
                                                value="creditCard"
                                                control={
                                                    <Radio color="default"/>
                                                }
                                            />
                                            <FormControlLabel
                                                label="取貨付款(超商) CVS" 
                                                value="cashCVS"
                                                control={
                                                    <Radio color="default"/>
                                                }
                                            />
                                            <FormControlLabel
                                                label="取貨付款(宅配) Express"
                                                value="cashDelivery"
                                                control={
                                                    <Radio color="default"/>
                                                }
                                            />
                                        </RadioGroup>
                                        <FormHelperText sx={{color:'#ba1616'}}>{inputError.payment && inputError.payment}</FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Stack>
                            <Grid item xs={12} my={3}>
                                <Divider color='#bdad9f'/>
                            </Grid> 
                            <Stack sx={{display:'flex', flexDirection:'row', width:'100%'}}>
                                <Grid item xs={12} lg={6}>
                                    <Typography variant='subtitle1' color="#44465e" fontWeight='bold'>
                                        Shipping Options 運送方式
                                    </Typography>  
                                </Grid> 
                                <Grid item xs={12} lg={6} display='flex' justifyContent='flex-end'>
                                    <FormControl sx={{mb:2, width:'80%'}}>
                                        <Select 
                                            id="shipping" 
                                            name="shipping"
                                            variant="standard"
                                            disabled={checkoutInfo.payment !== 'creditCard' && true}
                                            fullWidth
                                            value={checkoutInfo.shipping}  
                                            onChange={checkoutInfo.payment === 'creditCard' && handleCheckoutInfo} 
                                            sx={{
                                                '& .MuiSelect-select': {
                                                    pl:'20%'
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
                                            renderValue={(item) => item ? item : <Typography >超商取貨 CVS Pickup</Typography>}
                                            MenuProps={{ PaperProps: { style: { maxHeight: '33%' } } }}
                                        >
                                            <MenuItem value='超商取貨 CVS Pickup' dense sx={{ pl:'5%'}}>
                                                超商取貨 CVS Pickup
                                            </MenuItem>
                                            <MenuItem value='宅配 Express' dense sx={{ pl:'5%'}}>
                                                宅配 Express
                                            </MenuItem>
                                        </Select>
                                        <FormHelperText sx={{color:'#ba1616'}}>{inputError.shipping && inputError.shipping}</FormHelperText>
                                    </FormControl>
                                </Grid> 
                            </Stack>

                            { checkoutInfo.shipping === '超商取貨 CVS Pickup' 
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
                                            value={checkoutInfo.receipient}
                                            placeholder='Receipient 收件人姓名'
                                            onChange={handleCheckoutInfo}
                                            {...(inputError.receipient && {error:true, helperText: inputError.receipient})}
                                        />
                                        <StyledTextField
                                            variant="outlined"
                                            name="address"
                                            margin='normal'
                                            size="small" 
                                            value={checkoutInfo.address}
                                            fullWidth
                                            placeholder='Shipping Address 收件地址'
                                            onChange={handleCheckoutInfo}
                                            {...(inputError.address && {error:true, helperText: inputError.address})}
                                        />
                                    </Grid>
                            }
                            <Grid item xs={12} my={3}>
                                <Divider color='#bdad9f'/>
                            </Grid> 
                            <Grid item xs={12} lg={6} >
                                <Typography variant='subtitle1' color="#44465e" fontWeight='bold'>
                                    Subtotal 總金額
                                </Typography>  
                            </Grid> 
                            <Grid item xs={12} lg={6} display='flex' justifyContent='flex-end'>
                                <Typography variant='subtitle1' color="#44465e" fontWeight='bold'>
                                    NT$  {checkoutInfo.subtotal}
                                </Typography>  
                            </Grid> 
                            <Grid item xs={12} mt={3}>
                                <ButtonBase 
                                    variant="outlined"  
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
                        </Grid>
                    }
                </Container>
                <Alarm open={alarmStatus.open} onClose={handleClose} needRefresh={alarmStatus.needRefresh}>
                    {alarmStatus.content}
                </Alarm>
            </StyledContainer>
        </>
    )
}

export default Checkout;