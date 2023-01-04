import React, {useState, useEffect, useCallback} from 'react';
import {useParams, NavLink, useNavigate} from 'react-router-dom';
import { 
    Container, Box, TextField, Typography, Button, ButtonBase, Grid, styled, 
    FormControl, FormLabel, FormGroup, FormControlLabel, InputLabel, Radio, RadioGroup,
    IconButton, Divider, Select, Stack, Card, CardMedia, CardContent, MenuItem, Checkbox,OutlinedInput
} from '@mui/material';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useAuth } from './useAuth'; 
import  {StyledContainer} from '../Apparel/Apparel';
import Alarm from '../Alarm';
import ClearIcon from '@mui/icons-material/Clear';
import w9 from '../images/w9.jpg';
import w11 from '../images/w11.jpg';
import m6 from '../images/m6.jpg';
import m7 from '../images/m7.jpg';


const products = [
    {
        "id": 1,
        "title": "女裝 特級彈性高腰直筒牛仔褲",
        "descript": {
            "text": "穿起來俐落有型，3D剪裁更易於活動，從運動到休閒等各種場合都方便穿搭。\n・具光澤感的尼龍防撕裂布料，升級為更輕盈舒適的10丹尼尼龍布料。\n・採用防靜電內裡布料。",
            "material": "表面: 100% 聚醯胺纖維/ 填充物: 大身: 90% 羽絨, 10% 羽毛/ 連帽帽緣部分: 表層: 90% 羽絨, 10% 羽毛/ 連帽帽緣部分: 內層: 100% 聚酯纖維/ 內面: 100% 聚醯胺纖維/ 口袋布: 100% 聚酯纖維",
            "washingGuide": "手洗（水溫40度）, 不可乾洗"
        },
        "identity": "women",
        "apparelType": "bottoms",
        "price": 1190,
        "image": w9
    },
    {
        "id": 2,
        "title": "女裝 休閒西裝外套",
        "descript": {
            "text": "100%採用再生聚酯纖維製成的刷毛外套。寬鬆版型格外舒適。\n・採用100%再生聚酯纖維的材質製成。\n・口袋入口採用滾邊織帶設計，雙手易放入且袋口不易敞開。",
            "material": "大身: 口袋布: 100% 聚酯纖維( 回收聚酯纖維 )",
            "washingGuide": "洗衣機/弱水流（水溫40度）, 不可乾洗"
        },
        "identity": "women",
        "apparelType": "outers",
        "price": 1490,
        "image": w11
    },
    {
        "id": 3,
        "title": "男裝 休閒連帽外套",
        "descript": {
            "text": "以經典登山褲為設計基礎的束口褲。更易於活動且實用性高。\n・以復古登山褲為基礎所設計的束口褲。",
            "material": "大身: 82% 棉, 16% 聚醯胺纖維, 2% 彈性纖維/ 口袋布: 65% 聚酯纖維, 35% 棉/ 腰帶: 100% 聚酯纖維",
            "washingGuide": "洗衣機/弱水流（水溫40度）, 乾洗"
        },
        "identity": "men",
        "apparelType": "outers",
        "price": 990,
        "image": m6
    },
    {
        "id": 4,
        "title": "男裝 針織圖騰休閒外套",
        "descript": {
            "text": "既保暖又美型的「HEATTECH」緊身褲。俐落合身又能自在拉伸，穿起來輕鬆舒適。\n・・裏起毛材質附有吸濕發熱、保溫機能的「HEATTECH」機能，十分溫暖。\n・口袋尺寸、縫製手法及鈕扣尺寸都十分講究，是即使單穿也相當好看的內搭褲。",
            "material": "40% 棉 31% 聚酯纖維 11% 彈性纖維 10% 聚丙烯腈纖維 8% 嫘縈 [RUのみ表示]",
            "washingGuide": "洗衣機/弱水流（水溫40度）, 不可乾洗"
        },
        "identity": "men",
        "apparelType": "outers",
        "price": 1490,
        "image": m7
    }
];  

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
    const [cart, setCart] =useState([initialValues]);
    const [checkoutInfo, setCheckoutInfo] = useState({
        "payment": '',
        "shipping": '',
        "subtotal": '--'
    });
    const [open, setOpen] = useState(false);
    const {token} = useAuth();
    console.log('cart:', cart);
    console.log('checkoutInfo:', checkoutInfo);

    
    const handleClose = () => {
        setOpen(false);
    };

    const handleCheckoutInfo = (e) => {
        const {name, value,} = e.target;

        setCheckoutInfo({
            ...checkoutInfo,
            [name]: value,
        });
    };

    const handleQtyChange = async(event, cartId, index) => {
        let item = cart[index];
        item.count = event.target.value;
        let renewedQtyItems = cart.fill(item, index, index+1);
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
        .catch(error => setOpen(true))

       
        if (changeGoodsQty === "200") {
            let item = cart[index];
            item.count = event.target.value;
            let renewedQtyItems = cart.fill(item, index, index+1);
            setCart(renewedQtyItems);
            return renewedQtyItems;
            // console.log('item:', item);
        };
    };

    // useEffect (() => {
    //     setCart([...cart]);
    // }, [handleQtyChange()]);

    const removeFromCart = async(cartId) => {
        const removeItem = await axios.delete(`http://127.0.0.1:3001/dev/api/v1/carts/${cartId}`,
            {
                headers: {
                    'accept': '*/*',
                    "Authorization": `Bearer ${token}`
                }
            }
        )
        .then(response => response.status)
        .catch(error => console.log("error:",error))
        
        let remainItems = cart.filter(item => item.cartId !== cartId);
        setCart(remainItems);
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
            .then(response => setCart(response.data.cartGoods))
            .catch(error => console.log("error:",error))

            let subtotal = cart.map(item => item.price * item.count).reduce((prev, next) => prev += next);
            console.log("subtotal:",subtotal)
            setCheckoutInfo({
                ...checkoutInfo,
                "subtotal": subtotal
            });
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

    // let subtotal = cart.map(item => item.price * item.count).reduce((prev, next) => prev += next);
    

    return (
        <>
            <StyledContainer maxWidth="false" disableGutters sx={{pt:"124px", bgcolor:'#ebeff0',}}>
                <Divider />
                <Container component="main" maxWidth="xl" sx={{display:'flex', pt:10, minHeight: '80vh', overflow:"hidden"}}>
                    
                    <Grid container xs={12} md={7} pt={6} pb={10} mb={10} bgcolor='#fff' justifyContent='center' position='relative'>
                        <Typography variant="h6" color="#44465e" sx={{position:'absolute', left:'5%', borderBottom:'1.5px solid #44465e'}}>{cart.length === 0 ? "Your bag is empty." : "Your Bag"}</Typography>
                        {
                            cart.map((item, index) => (
                                <Box pt={9} sx={{width:'90%', borderBottom: 1, borderColor: 'divider',}}>
                                    <Card elevation={0} sx={{display:'flex', marginBottom:'20px', height:'150px',}}>
                                        <Grid item xs={12} md={6} lg={1}>
                                            <FormControl sx={{height:'100%', top:'35%'}}>
                                                <Checkbox disableRipple defaultChecked sx={{color:"#9c8f83", '&.Mui-checked': { color:'#9c8f83'}}} />
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
                                                    <FormControl size="small" >
                                                            <IconButton disableRipple sx={{display:'flex', justifyContent:'flex-end', mb:2, pr:0, color:'#a7aaab', '&:hover':{color:'#9c8f83'}}}>
                                                                <ClearIcon onClick={() => removeFromCart(item.cartId)}/>
                                                            </IconButton>
                                                            <Select 
                                                                id="qty" 
                                                                name="qty"
                                                                variant="standard"
                                                                value={item.count}
                                                                onChange={(event) => handleQtyChange(event, item.cartId, index)} 
                                                                sx={{
                                                                    mb:2, 
                                                                    '& .MuiSelect-select': {
                                                                        pl:'45%'
                                                                    },
                                                                    '&.MuiInput-root::after': {
                                                                        borderBottom:'none',
                                                                    },
                                                                }} 
                                                                displayEmpty
                                                                renderValue={(item) => item ? item : <text >1</text>}
                                                                MenuProps={{ PaperProps: { style: { maxHeight: '33%' } } }}
                                                            >
                                                                {/* {    console.log('count:', item.count)} */}
                                                                { 
                                                                    Array.from({length: 20}, (_, index) => {
                                                                        return <MenuItem value={index+1} dense sx={{ pl:'50%'}}>
                                                                                    { index+1 }
                                                                                </MenuItem>
                                                                    })
                                                                }
                                                            </Select>
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
                        <Grid container xs={12} md={5} px={8} py={6} mb={10} spacing={1} overflow="hidden" height='100%'>
                            {/* <Stack width='100%' sx={{display:'flex', justifyContent:'left'}}> */}
                                <Grid item xs={12}>
                                    <FormControl component="form" sx={{display:'flex', flexDirection:'row',  height:'40px',}}>
                                        <StyledTextField variant="outlined" size="small" placeholder="Promotion Code" fullWidth/>
                                        <Button variant="contained" sx={{marginLeft:1, bgcolor:'#9c8f83'}} disableElevation disableRipple>
                                            APPLY
                                        </Button>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} my={2}>
                                    <Divider color='#bdad9f'/>
                                </Grid> 

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
                                <Grid item xs={12} my={2}>
                                    <Divider color='#bdad9f'/>
                                </Grid> 
                                
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

                                <Grid item xs={12} my={2}>
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
                                        type="submit"
                                        disableRipple
                                        sx={{
                                            border:'1px solid #1a1a1a', 
                                            height: 45, 
                                            width: "100%",
                                            "&:hover": {
                                                border: 'none',
                                                bgcolor: ' rgb(156, 143, 131, 0.5)'
                                            }
                                        }}
                                    >
                                        SUBMIT ORDER
                                    </ButtonBase>
                                </Grid>
                            {/* </Stack> */}
                        </Grid>
                    }
                </Container>
                <Alarm open={open} onClose={handleClose}>
                    庫存不足
                </Alarm>
            </StyledContainer>
        </>
    )
}

export default Checkout;