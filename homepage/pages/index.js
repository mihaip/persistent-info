import React from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import Link from 'next/link'

const Card = ({ href, title, subtitle }) => <div>
  <Link href={href} >
    <a className="card">
      <h3>{title} &rarr;</h3>
      <p>{subtitle}</p>
    </a>
  </Link>
  <style jsx>{`
      .card {
        display: block;
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
</div>

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
      <link rel='icon' href='/static/favicon.ico' />
    </Head>

    <Nav />

    <div className='hero'>
      <h1 className='title'>persistent.info</h1>
      <p className='description'>
        Mihai Parparita's home on the web
      </p>

      <div className='row'>
        <Card href="/projects" title="Projects" subtitle="Side projects over the years"/>

        <Card href="http://blog.persistent.info/" title="Blog" subtitle="Increasingly infrequent"/>

        <Card href="/resume" title="Resume" subtitle="TODO"/>

        <Card href="/elsehwere" title="Elsewhere" subtitle="TODO"/>
      </div>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
      }
    `}</style>
  </div>
)

export default Home
