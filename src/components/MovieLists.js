import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import constants from '../config/constants'

import movieActions from '../redux/Movie/movieActions';

import { getRequest } from '../config/axiosClient'

import { Layout, Menu, Breadcrumb, Card, Input,  Row, Col, Divider, Badge, Drawer, Image, Pagination, Tag } from 'antd';

const { Meta } = Card;

const { Header, Content, Footer } = Layout;

const { Search } = Input;


const DescriptionItem = ({ title, content }) => (
  <div>
    <p><b>{title}:</b> {content}</p>
  </div>
);


export default function MovieLists() {
  const [ drawer, setDrawer ] = useState(false)
  // const [ movieDetail, setMovieDetail ] = useState([])

  const movieData = useSelector(state => state.movieReducer)
  const dispatch = useDispatch();

  const showDetails = async (id) => {
     setDrawer(!drawer)  
    try { 
        const res = await getRequest(`/3/movie/${id}?language=en-US`);
       
        dispatch({
          type: movieActions.DETAILS,
          payload: res.data
        })
      // setMovieDetail(val)
    } catch (err) { 

    }
  }

  const changePagination = async (val) => {
  try { 
      const res = await getRequest(`/3/search/movie?query=${movieData.search}&page=${val}`);
        dispatch({
          type: movieActions.MOVIE,
          payload:{ ...res.data, value: movieData.search }
        })
    } catch( err ) {
      alert(err)
    }
  }

  return(
    <>
     <Row gutter={[12, 24]}>
     {
      movieData.movie.map((val, key) => { 
        return(
          <Col>
           <Badge.Ribbon text={val.release_date}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <img 
                 style={{ height: 350 }}
                 src={val.poster_path ? `${constants.IMG_URL}${val.poster_path}` : 'https://www.tibs.org.tw/images/default.jpg' } />
             }
              onClick={ () => { 
                showDetails(val.id)
              }}
            >
              <Meta title={val.original_title}  />
            </Card>
         </Badge.Ribbon>
          </Col>
        )
      })
     }
    </Row>
      <Pagination defaultCurrent={movieData.pages.page} total={movieData.pages.total_pages} onChange={changePagination} />
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={() => setDrawer(!drawer)}
          visible={drawer}
        >
           {
            movieData.details.length !== 0 && 
              <>
              <Image
            src={`${constants.IMG_URL}${movieData.details.backdrop_path}`}
          />
           <Row>
              <Col span={10}>
                <Image
                  width={200}
                  src={`${constants.IMG_URL}${movieData.details.poster_path}`}
                />
              </Col>
         
              <Col span={14}>
                <h1 className="site-description-item-profile-p">{movieData.details.original_title}</h1>
                <DescriptionItem title="Description" content={movieData.details.overview} />
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <DescriptionItem title="Status" content={movieData.details.status} />
                <DescriptionItem title="Language" content={movieData.details.original_language} />
                <DescriptionItem title="Vote Count" content={movieData.details.vote_count} />
                <DescriptionItem title="Vote Average" content={movieData.details.vote_average} />
                <DescriptionItem title="Popularity" content={movieData.details.popularity} />
                <DescriptionItem title="Revenue" content={movieData.details.revenue} />
                <DescriptionItem title="Runtime" content={movieData.details.runtime} />
              </Col>
               <Col span={12}>
                <DescriptionItem title="Genre" content={
                  movieData.details.genres.map((val, key) => (
                     <Tag color="#108ee9">{val.name}</Tag>
                  ))
                } />
                
                 <DescriptionItem title="Production Companies" content={
                  movieData.details.production_companies.map((val, key) => (
                     <Tag color="#108ee9">{val.name}</Tag>
                  ))
                } />
                

                  <DescriptionItem title="Production Countries" content={movieData.details.production_countries.map((val, key) => (
                     <Tag color="#108ee9">{val.name}</Tag>
                  ))} />
              
                  <DescriptionItem title="Spoken Language" content={
                  movieData.details.spoken_languages.map((val, key) => (
                     <Tag color="#108ee9">{val.name}</Tag>
                  ))
                } />
               
              </Col>
            </Row>
              </>
           }
        </Drawer>

        </>
  )
}