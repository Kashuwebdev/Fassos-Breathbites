import React, { useEffect, useRef, useState } from 'react'
import right from '../image/right.svg';
import left from '../image/left.svg';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Dashboard() {
    const prevRef = useRef(null);

    const navigate = useNavigate();


    const [food, setFood] = useState([]);
    const [search, setSearch] = useState('');
    useEffect(() => {
        fetch('http://localhost:3008/data').then(resp => resp.json()).then(json => {
            console.log(json);
            setFood(json);
        })
    }, [])
    const Logout = () => {
        navigate('/')
    }

    const data = [{
        id: 1,
        name: "Pizza",
        image: "https://assets-us-01.kc-usercontent.com/4353bced-f940-00d0-8c6e-13a0a4a7f5c2/2ac60829-5178-4a6e-80cf-6ca43d862cee/Quick-and-Easy-Pepperoni-Pizza-700x700.jpeg?w=1280&auto=format"
    }, {
        id: 2,
        name: "Burger",
        image: "https://mrbrownbakery.com/image/images/rEyMLsj21Ooxk5mfhdeh7bSevaLGzUtczWXVDj4u.jpeg?p=full"
    }, {
        id: 3,
        name: "Chinese",
        image: "https://ik.imagekit.io/awwybhhmo/satellite_images/chinese/beyondmenu/hero/2.jpg?tr=w-3840,q-50"
    }, {
        id: 4,
        name: "Biryani",
        image: "https://www.madhuseverydayindian.com/wp-content/uploads/2022/11/easy-vegetable-biryani.jpg"
    }, {
        id: 5,
        name: "Dosa",
        image: "https://assets.gqindia.com/photos/64f1da6829ae1dbbe3d61789/16:9/w_2560%2Cc_limit/Dosa1.jpg"
    }, {
        id: 6,
        name: "Samosa",
        image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/samosa-recipe.jpg"
    }, {
        id: 7,
        name: "Spring Roll",
        image: "https://productimages.withfloats.com/actual/624038417e882f0001e2fba6.jpg"
    }, {
        id: 8,
        name: "Tomato Soup",
        image: "https://cdn.loveandlemons.com/wp-content/uploads/2023/01/tomato-soup-recipe.jpg"

    }, {
        id: 9,
        name: "Cuisine",
        image: "https://www.jaypeehotels.com/blog/wp-content/uploads/2020/09/chinese-1.jpg"
    }, {
        id: 10,
        name: "Chole Bhature",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Chole_Bhature_At_Local_Street.jpg/1200px-Chole_Bhature_At_Local_Street.jpg"
    }]
    return (
        <div>
            {/* Header section */}
            <div className='headers'>
                <div className='container'>
                    <img className='mb-5 ms-4 mt-4' src='https://product-assets.faasos.io/eatsure_cms/production/333b405b-13b6-429f-82db-900e9795da54.png' height={'95px'} width={'auto'} />
                    <button className='btn btn-primary float-end mt-5 ' onClick={Logout}>Sign Out</button>
                </div>

            </div>
            <br />

            {/* Carousel section */}
            <div className='carousel'>
                <div className='container'>
                    <button style={{ border: "none", background: "none", position: "absolute", top: "85px", left: "55px" }}
                        onClick={() => {
                            prevRef.current.scrollBy({
                                left: -200,
                                behavior: "smooth"
                            })
                        }}
                    >
                        <img src={left} />
                    </button>
                    <div ref={prevRef} style={{ display: "flex", overflow: "hidden" }}>

                        {
                            data.map((x) => (
                                <div key={x.id}>
                                    <div className='card me-3' style={{ width: '15rem' }}>
                                        <img src={x.image} alt='food-item' height="185px" />

                                    </div>
                                </div>
                            ))
                        }

                    </div>
                    <button style={{ border: "none", background: "none", position: "absolute", top: "80px", left: "1430px" }}
                        onClick={() => {
                            prevRef.current.scrollBy({
                                left: 200,
                                behavior: "smooth"
                            })
                        }}
                    >
                        <img src={right} />
                    </button>
                </div>

            </div>

            {/* Search Bar */}
            <form>
                <input value={search} onChange={(e) => { setSearch(e.target.value) }} className="form-control mx-auto mt-5 mb-5 w-50" placeholder='Search Your Favourite Restaurant...' />
            </form>
            {/* food data */}

            <div className='food_data'>
                <div className='container'>
                    <h1 className='text-danger'>Hurry ! Grab Your Favourite Food From Our Top Restaurant</h1>
                    <Row>
                        {
                            food.filter((x) => {
                                if (search == "") {
                                    return true;
                                } else {
                                    return x.title.toLowerCase().includes(search.toLowerCase())
                                }
                            }).map((x) => (
                                <Col>
                                    <div key={x.id}>
                                        <div className='card m-4' style={{ width: "15rem" }}>
                                            <img className='card-img-top' src={x.images} alt='food_data' height='165px' />
                                            <div className='card-body'>
                                                <p>Restaurant: {x.title}</p>
                                                <p>rating: {x.ratings}</p>
                                                <p>Area: {x.area}</p>

                                            </div>
                                        </div>

                                    </div>
                                </Col>
                            ))
                        }
                    </Row>
                </div>
            </div >
        </div >
    )
}

export default Dashboard
