import React, { Fragment, useState, useEffect } from 'react'

import { MDBDataTable } from 'mdbreact'



import MetaData from '../layout/MetaData'

import Loader from '../layout/Loader'

import Sidebar from './Sidebar'

import { useNavigate} from 'react-router-dom'

// import { useAlert } from 'react-alert'
import { toast } from 'react-toastify'

import { useDispatch, useSelector } from 'react-redux'

// import { getProductReviews, deleteReview, clearErrors } from '../../actions/productActions'

import { getProductReviews, clearErrors,deleteReview } from '../../actions/productActions'

import { DELETE_REVIEW_RESET } from '../../constants/productConstants'



const ProductReviews = () => {

    let navigate = useNavigate();

    const [productId, setProductId] = useState('')


    const notifys = (message = "") =>
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    // const alert = useAlert();

    const dispatch = useDispatch();

    const errMsg = (message = '') => toast.error(message, {

        position: toast.POSITION.BOTTOM_CENTER

    });

    const successMsg = (message = '') => toast.success(message, {

        position: toast.POSITION.BOTTOM_CENTER

    });


    const { error, reviews } = useSelector(state => state.productReviews);

     const { isDeleted, error: deleteError } = useSelector(state => state.review)
    // const {  error: deleteError } = useSelector(state => state.review)
    // const { isDeleted, error: deleteError } = useSelector(state => state.review)


    useEffect(() => {



        if (error) {

            errMsg(error);

            dispatch(clearErrors())

        }



        if (deleteError) {

            errMsg(deleteError);

            dispatch(clearErrors())

        }



        if (productId !== '') {

            dispatch(getProductReviews(productId))

        }



        if (isDeleted) {

            successMsg('Review deleted successfully');
            navigate('/admin/reviews');
            dispatch({ type: DELETE_REVIEW_RESET })

        }







    // }, [dispatch, error, productId, deleteError])

    }, [dispatch, error, productId])

   

    const deleteReviewHandler = (id) => {

        dispatch(deleteReview(id, productId))
        successMsg('Review deleted successfully');
        navigate('/admin/reviews');
        dispatch({ type: DELETE_REVIEW_RESET })

    }



    const submitHandler = (e) => {

        e.preventDefault();

        dispatch(getProductReviews(productId))

    }



    const setReviews = () => {

        const data = {

            columns: [

                {

                    label: 'Review ID',

                    field: 'id',

                    sort: 'asc'

                },

                {

                    label: 'Rating',

                    field: 'rating',

                    sort: 'asc'

                },

                {

                    label: 'Comment',

                    field: 'comment',

                    sort: 'asc'

                },

                {

                    label: 'User',

                    field: 'user',

                    sort: 'asc'

                },

                {

                    label: 'Actions',

                    field: 'actions',

                },

            ],

            rows: []

        }



        reviews.forEach(review => {

            data.rows.push({

                id: review._id,

                rating: review.rating,

                comment: review.comment,

                user: review.name,



                actions:

                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteReviewHandler(review._id)}>

                        <i className="fa fa-trash"></i>

                    </button>

                    // <button className="btn btn-danger py-1 px-2 ml-2" >

                    //      <i className="fa fa-trash"></i>

                    // </button>

            })

        })



        return data;

    }



    return (

        <Fragment>

            <MetaData title={'Product Reviews'} />

            <div className="row">

                <div className="col-12 col-md-2">

                    <Sidebar />

                </div>



                <div className="col-12 col-md-10">

                    <Fragment>

                        <div className="row justify-content-center mt-5">

                            <div className="col-5">

                                <form onSubmit={submitHandler}>

                                    <div className="form-group">

                                        <label htmlFor="productId_field">Enter Product ID</label>

                                        <input

                                            type="text"

                                            id="productId_field"

                                            className="form-control"

                                            value={productId}

                                            onChange={(e) => setProductId(e.target.value)}

                                        />

                                    </div>



                                    <button

                                        id="search_button"

                                        type="submit"

                                        className="btn btn-primary btn-block py-2"

                                    >

                                        SEARCH

                                    </button>

                                </ form>

                            </div>



                        </div>



                        {reviews && reviews.length > 0 ? (

                            <MDBDataTable

                                data={setReviews()}

                                className="px-3"

                                bordered

                                striped

                                hover

                            />

                        ) : (

                                <p className="mt-5 text-center">No Reviews.</p>

                            )}





                    </Fragment>

                </div>

            </div>



        </Fragment>

    )

}



export default ProductReviews

