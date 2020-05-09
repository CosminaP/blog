import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"

const Title = styled.h1`
  display: block;
  color: rgba(128,93,102, 0.8);
`

const Posts = styled.h4`
display: inline-block;
`

const BlogTitle = styled.h3`
  margin-bottom: 20px;

  &:hover {
    color: rgba(128,93,102, 0.8);
  }
`

const BlogLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const BlogBody = styled.div`
  margin-bottom: 50px;
`

export default ({ data }) => {
  return (
    <Layout>
      <div>
        <Title>Thoughts by Cosmina</Title>
        <Posts>{data.allMarkdownRemark.totalCount} Posts</Posts>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <BlogBody key={node.id}>
            <BlogLink to={node.fields.slug}>
              <BlogTitle>
                {node.frontmatter.title} <span>— {node.frontmatter.date}</span>
              </BlogTitle>
            </BlogLink>
            <p>{node.frontmatter.description || node.excerpt}</p>
          </BlogBody>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            description
          }
          fields {
            slug
          }
          excerpt(truncate: true)
        }
      }
    }
  }
`
