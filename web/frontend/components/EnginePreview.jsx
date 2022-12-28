import { Card, FormLayout, TextField } from '@shopify/polaris'
import React, { useState } from 'react'
import styled from 'styled-components'
import { convertToPlain, stripHTML } from '../util'

const TiTlePreview = styled.p`
    color: #1a0dab;
    font-size: 1.125rem;
    line-height: 1.3125rem;
    margin-bottom: .125rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const LinkPreview = styled.p`
    font-size: .8125rem;
    overflow-wrap: break-word;
    word-break: break-word;
    color: #006621;
    line-height: 1rem;
    margin-bottom: 0.125rem;
`

const DescriptionPreview = styled.p`
    color: #545454;
    line-height: 1.125rem;
    font-size: .8125rem;
    overflow-wrap: break-word;
    word-break: break-word;
`

function EnginePreview({ title, bodyHTML }) {
    const [isSeoOpen, setisSeoOpen] = useState(false)
    const [seoTitle, setSeoTitle] = useState("")
    const [seoDescription, setSeoDescription] = useState("")
    const [handle, setHandle] = useState(title.trim().replace(/\s+/g, '-').toLowerCase())

    const baseURL = `https://my-bad-app.myshopify.com/pages/`
    console.log(title, bodyHTML)
    const handleShowSeoSettings = () => {
        setisSeoOpen(prev => !prev)
    }

    return (
        <Card title="Search engine listing preview"
            actions={!isSeoOpen ? [
                {
                    content: 'Edit SEO Settings',
                    onAction: handleShowSeoSettings
                },
            ] : null}
        >
            <Card.Section>
                {!title.trim() && !bodyHTML.trim() && <p> Add a title and description to see how this Page might appear in a search engine listing</p>}
                {!title.trim() && bodyHTML.trim() && <p> Add a title to see how this Page might appear in a search engine listing</p>}
                {title.trim() && !bodyHTML.trim() && <p> Add a description to see how this Page might appear in a search engine listing</p>}

                {title.trim() && bodyHTML.trim() &&
                    <>
                        <TiTlePreview>{seoTitle || title.trim()}</TiTlePreview>
                        <LinkPreview>{`${baseURL}${handle}`}</LinkPreview>
                        <DescriptionPreview>{seoDescription || convertToPlain(bodyHTML)}</DescriptionPreview>
                    </>
                }
            </Card.Section>

            {isSeoOpen && <Card.Section>
                <FormLayout >
                    <TextField
                        label="Page title"
                        placeholder={title}
                        value={seoTitle}
                        helpText={`${title.length} of 70 characters used`}
                        onChange={(value) => setSeoTitle(value)}
                    />

                    <TextField
                        label="Page description"
                        placeholder={convertToPlain(bodyHTML)}
                        value={seoDescription}
                        helpText={`${seoDescription.length} of 200 characters used`}
                        onChange={(value) => setSeoDescription(value)}
                    />

                    <TextField
                        label="URL and handle"
                        type="text"
                        value={handle}
                        onChange={value => setHandle(value)}
                        prefix="https://my-bad-app.myshopify.com/pages/"
                    />


                </FormLayout>
            </Card.Section>}
        </Card >
    )
}

export default EnginePreview