import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import movieActions from '../redux/Movie/movieActions';

import { getRequest } from '../config/axiosClient'

import MovieLists from '../components/MovieLists'


import { Layout, Menu, Breadcrumb, Card, Input,  Row, Col, Divider  } from 'antd';

const { Meta } = Card;

const { Header, Content, Footer } = Layout;

const { Search } = Input;

export default function Home() {

  const [ loading, setLoading ] = useState(false)
  const dispatch = useDispatch();



  useEffect(() => { 
    onSearch('A')
  }, [])

  const onSearch =  async (value) => { 
    setLoading(!loading)
    try { 
      const res = await getRequest(`/3/search/movie?query=${value}&page=1`);

        dispatch({
          type: movieActions.MOVIE,
          payload: { ...res.data, value: value }
        })

      setLoading(!loading)
    } catch( err ) {
      alert(err)
    }
  }

  return (
   <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <h1 style={{ color: '#fff' }}>Movie Search</h1>
    </Header>

    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
    
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
         <Search
          placeholder="Search movie."
          allowClear
          enterButton="Search"
          size="large"
          style={{ width: 300 }}
          onSearch={onSearch}
        />

      <Divider />
      <MovieLists />
      </div>
    </Content>
  </Layout>
  )
}
