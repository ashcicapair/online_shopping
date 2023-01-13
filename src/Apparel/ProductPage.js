import React, {useState, useEffect, } from 'react';
import { Navigate, useLocation, useNavigate} from 'react-router-dom';
import { 
    Box, Typography, Grid, Stack, FormControl, FormControlLabel, InputBase, 
    Radio, RadioGroup, IconButton, ButtonBase, Divider, Tabs, Tab 
} from '@mui/material';
import HeaderNav from '../homepage/HeaderNav';
import Alarm from '../Alarm';
import  {StyledContainer} from './Apparel';
import axios from 'axios';
import { useAuth } from '../account/useAuth'; 
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import s3 from '../images/s3.png';
import s2 from '../images/s2.png';
import m3 from '../images/m3.png';
import m2 from '../images/m2.png';
import l3 from '../images/l3.png';
import l2 from '../images/l2.png';


const TabPanel = ({children, value, index}) => {

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography sx={{color:'#736b6b'}}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const initialValues = {
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
    "image": "w9"
};


const ProductPage = () => {
    const [productInfo, setProductInfo] = useState(initialValues);
    const [cart, setCart] = useState({
        "size": "",
        "qty": 1,
    });
    const [alarmContent, setAlarmContent] = useState('');
    const [open, setOpen] = useState(false);
    const [tabValue, setTabValue] = useState(1);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const goodsId = parseInt(query.get('goodsId'));
    const {user, token, logout} = useAuth();
    const navigate = useNavigate();


    const handleCartChange = (e) => {
        const {name, value,} = e.target;
        setCart({
            ...cart,
            [name]: value,
        })
    }

    const changeQty = (action) => {
        if (action === 'plus') {
            setCart({
                ...cart,
                "qty": cart.qty + 1,
            });
        }   else if (action === 'minus') {
            setCart({
                ...cart,
                "qty": cart.qty - 1,
            });
        }
    };
    
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddToCart = async(e) => {
        e.preventDefault();
        const addGoodsToCart = await axios.post('http://127.0.0.1:3001/dev/api/v1/carts',
            {
                "goodsId": goodsId,
                "size": cart.size,
                "count": cart.qty
            },
            {
                headers: {
                    'accept': 'application/json',
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(response => response)
        .catch(error => error.response)
        
        if (addGoodsToCart.status) {
            if (addGoodsToCart.status === 200) {
                setAlarmContent("成功加入購物車");
                setOpen(true);
            } else if (addGoodsToCart.status === 400 && addGoodsToCart.data.message === "The goods is already in cart.") {
                setAlarmContent("購物車已有商品");
                setOpen(true);
            } else if (addGoodsToCart.status === 401) {
                logout();
                setAlarmContent("請重新登入");
                setOpen(true);
                setTimeout(() => 
                    navigate("/signin")
                , 1500);
            } else {
                setAlarmContent("系統錯誤");
                setOpen(true);
            };
        } else {
            logout();
            setAlarmContent("請重新登入");
            setOpen(true);
            setTimeout(() => 
                navigate("/signin")
            , 1500);
        };
    };

    const proceedToCheckOut = async(e) => {
        e.preventDefault();
        const addGoodsToCart = await axios.post('http://127.0.0.1:3001/dev/api/v1/carts',
            {
                "goodsId": goodsId,
                "size": cart.size,
                "count": cart.qty
            },
            {
                headers: {
                    'accept': 'application/json',
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(response => response)
        .catch(error => error.response)

        if (addGoodsToCart.status) {
            if (addGoodsToCart.status === 200) {
                setTimeout(() => 
                    navigate("/account/cart")
                , 500)
            } else if (addGoodsToCart.status === 400) {
                setTimeout(() => 
                    navigate("/account/cart")
                , 500)
            } else if (addGoodsToCart.status === 401) {
                logout();
                setAlarmContent("請重新登入");
                setOpen(true);
                setTimeout(() => 
                    navigate("/signin")
                , 500)
            } else {
                setAlarmContent("系統錯誤");
                setOpen(true);
            };
        } else {
            logout();
            setAlarmContent("請重新登入");
            setOpen(true);
            setTimeout(() => 
                navigate("/signin")
            , 1500);
        };
    };

    useEffect (() => {
        const gettingProductInfo = async() => {
            const itemInfo = await axios.get(`http://127.0.0.1:3001/dev/api/v1/goods/${goodsId}`)
            .then(response => response.data)
            .catch(error => console.log("error:",error))

            setProductInfo(itemInfo);
        };

        gettingProductInfo();
    }, [])

    return (
        <>
            <StyledContainer maxWidth="false" disableGutters>
                <HeaderNav sectionName="homeSections"/>
                <Grid container justifyContent="center">
                    <Grid item xs={12} xl={5} my={10} mx={3}>
                        <Box 
                            component="img"
                            sx={{ width: 'auto', height:'900px',}}
                            src={require(`../images/${productInfo.image}.jpg`)}
                            alt={productInfo.title}
                        />    
                        <Box 
                            component="img"
                            sx={{ width: 'auto', height:'900px',}}
                            src={require(`../images/${productInfo.image}.jpg`)}
                            alt={productInfo.title}
                        />
                        <Box 
                            component="img"
                            sx={{ width: 'auto', height:'900px',}}
                            src={require(`../images/${productInfo.image}.jpg`)}
                            alt={productInfo.title}
                        />
                        <Box 
                            component="img"
                            sx={{ width: 'auto', height:'900px',}}
                            src={require(`../images/${productInfo.image}.jpg`)}
                            alt={productInfo.title}
                        />
                        <Box 
                            component="img"
                            sx={{ width: 'auto', height:'900px',}}
                            src={require(`../images/${productInfo.image}.jpg`)}
                            alt={productInfo.title}
                        />
                        <Box 
                            component="img"
                            sx={{ width: 'auto', height:'900px',}}
                            src={require(`../images/${productInfo.image}.jpg`)}
                            alt={productInfo.title}
                        />            
                    </Grid>

                    <Grid item xs={12} xl={5} my={10} mx={3}>  
                        <Box width={650} sx={{display:'flex', flexDirection:'column', position:{ xl: 'fixed',}}}>
                            <Stack direction="row" justifyContent={"space-between"}>
                                <Typography variant="h5" sx={{color:'#1a1a1a',}}>
                                    {productInfo.title}
                                </Typography>
                                <Typography variant="h5" sx={{color:'#1a1a1a', }}>
                                    NT.&nbsp;{productInfo.price}
                                </Typography>
                            </Stack>    

                            <FormControl sx={{ mt: 3, ml:0 }}variant="standard" hiddenLabel required >
                                <RadioGroup row name="size" onChange={handleCartChange}> 
                                    <FormControlLabel
                                        aria-label ="S"
                                        value="S"
                                        control={
                                            <Radio   
                                                disableRipple
                                                icon={
                                                    <img src={s3} height={40} width={40}/>
                                                }
                                                checkedIcon={
                                                    <img src={s2} height={40} width={40}/>
                                                }
                                            />
                                        }
                                    />
                                    <FormControlLabel
                                        aria-label ="M"
                                        value="M"
                                        control={
                                            <Radio  
                                                disableRipple
                                                icon={
                                                    <img src={m3} height={40} width={40}/>
                                                }
                                                checkedIcon={
                                                    <img src={m2} height={40} width={40}/>
                                                }
                                            />
                                        }
                                    />
                                    <FormControlLabel
                                        aria-label ="L"
                                        value="L"
                                        control={
                                            <Radio  
                                                disableRipple
                                                icon={
                                                    <img src={l3} height={40} width={40}/>
                                                }
                                                checkedIcon={
                                                    <img src={l2} height={40} width={40}/>
                                                }
                                            />
                                        }
                                    />
                                </RadioGroup>
                            </FormControl>
                            
                            <FormControl sx={{ mt: 4, ml:0}}>
                                <InputBase variant="outlined" width={650}
                                    name="qty"
                                    value={cart.qty}
                                    readOnly
                                    required
                                    sx={{
                                        border:'1px solid #1a1a1a', 
                                        height: 50, 
                                        "& .MuiInputBase-input":{
                                            paddingLeft: '281px'
                                        }
                                    }} 
                                    startAdornment={
                                        <IconButton aria-label="minusQty" disabled={cart.qty <= 1} disableRipple onClick={() => changeQty("minus")} >
                                            <RemoveIcon fontSize="small" sx={{ml:1, cursor: "pointer", color:'#1a1a1a',}} />
                                        </IconButton>
                                    }
                                    endAdornment={
                                        <IconButton aria-label="plusQty" disabled={cart.qty >= 20} disableRipple onClick={() => changeQty("plus")}>
                                            <AddIcon fontSize="small" sx={{mr:1, cursor: "pointer", color:'#1a1a1a',}} />
                                        </IconButton>
                                        }
                                />
                            </FormControl>

                            <FormControl sx={{ mt: 5, ml:0, }} >
                                <Grid container spacing={2}>
                                    <Grid item xs={6} >
                                        <ButtonBase 
                                            variant="outlined"
                                            disableRipple
                                            onClick={user ? (cart.size ? proceedToCheckOut : setOpen) : setOpen}
                                            sx={{
                                                border:'1px solid #1a1a1a', 
                                                height: 50, 
                                                width: "100%",
                                                "&:hover": {
                                                    border: 'none',
                                                    bgcolor: '#9c8f83'
                                                }
                                            }}
                                        >
                                            {cart.size ? "CHECKOUT" : "CHOOSE SIZE"}
                                        </ButtonBase>
                                    </Grid>    
                                    <Grid item xs={6}> 
                                        <ButtonBase 
                                            variant="outlined"  
                                            disableRipple
                                            onClick={user ? (cart.size ? handleAddToCart : setOpen) : setOpen}
                                            sx={{
                                                border:'1px solid #1a1a1a', 
                                                height: 50, 
                                                width: "100%",
                                                color: '#faf7f7',
                                                bgcolor: '#1a1a1a'
                                            }}
                                        >
                                            {cart.size ? "ADD TO CART" : "CHOOSE SIZE"}
                                        </ButtonBase>
                                    </Grid>
                                </Grid>
                            </FormControl>
                            <Divider sx={{ mt: 5}}/>
                            <Tabs 
                                value={tabValue} 
                                variant="fullWidth" 
                                textColor='inherit' 
                                aria-label="tabs_datail" 
                                onChange={handleTabChange}
                                sx={{
                                    "& .MuiTabs-indicator": {
                                        bgcolor: '#d43f3f'
                                    },
                                }}
                            >
                                <Tab value={1} label="Product Info" disableRipple disableFocusRipple/>
                                <Tab value={2} label="Washing Guide" disableRipple disableFocusRipple/>
                                <Tab value={3} label="Size Guide" disableRipple disableFocusRipple/>
                            </Tabs>
                            <TabPanel value={tabValue} index={1}>
                                {productInfo.descript.text}
                            </TabPanel>
                            <TabPanel value={tabValue} index={2}>
                                {productInfo.descript.material}
                                <br/>
                                <br/>
                                {productInfo.descript.washingGuide}
                            </TabPanel>
                            <TabPanel value={tabValue} index={3}>
                                {productInfo.descript.text}
                            </TabPanel>
                        </Box>
                    </Grid>
                </Grid>
                <Alarm open={open} onClose={handleClose}>
                    {alarmContent || (user ?
                                        (cart.size ? "商品加入購物車" : "請選擇尺寸")
                                    :
                                        <Navigate to='/signin/'/>
                                    )
                    }
                </Alarm>
            </StyledContainer>
        </>
    )
}

export default ProductPage;