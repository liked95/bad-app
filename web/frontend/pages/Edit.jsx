import { useNavigate, TitleBar, Loading } from "@shopify/app-bridge-react";
import styled from 'styled-components'
import {
  Badge,
  Banner,
  Card,
  FormLayout,
  Icon,
  Layout,
  Page,
  PageActions,
  Stack,
  TextField,
  ButtonGroup,
  Button,
  ChoiceList
} from "@shopify/polaris";


import { useCallback, useState, useEffect, useRef } from "react";
import { useAuthenticatedFetch } from "../hooks";

import { headers } from "../custom-api";
import { SinglePageSekeleton } from "../components/Skeleton/SinglePageSekeleton";
import TextEditor from '../components/TextEditor'

const ContentWrapper = styled.div`
 margin-top: 5px;
 border: 1px solid #c8cdcd;
 border-radius: 5px;
 overflow: hidden;
`

const ToolWrapper = styled.div`
 padding: 8px;
 background-color: #fafbfb;
 border-bottom: 1px solid #c8cdcd;
`

const IframeWrapper = styled.div`
 margin-top: 5px;
`

export default function Edit() {

  var id = new URLSearchParams(location.search).get("id")
  let fetchApi = useAuthenticatedFetch()

  // Title and editable area
  const [title, setTitle] = useState("")
  const [bodyHTML, setBodyHTML] = useState("")
  const [loading, setLoading] = useState(false)

  // console.log(bodyHTML)

  // radio button visiblity
  const [visiblity, setVisiblity] = useState(['visible']);
  const handleChange = useCallback((value) => setVisiblity(value), []);


  const getSinglePage = async () => {
    let res = await fetchApi(`/api/pages/${id}`, {
      method: "GET",
      headers
    })

    let data = await res.json()
    return data
  }

  useEffect(async () => {
    try {
      setLoading(true)
      let data = await getSinglePage()
      console.log(data)
      setTitle(data.title)
      setBodyHTML(data.body_html)
      setLoading(false)
      data.published_at ? setVisiblity(['visible']) : setVisiblity(['hidden'])
    } catch (error) {
      console.log(error)
    }
  }, [id]);


  const handleUpdatePage = async () => {
    // check if content is changed
    
    let res = await fetchApi('/api/pages', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json'
      },
      body: JSON.stringify(
        {
          title: title,
          body_html: bodyHTML,
          published: visiblity[0] == 'visible'
        }
      )
    })

    let data = await res.json()
    console.log(data)
  }

  // text editor






  return (
    <>
      {loading && <SinglePageSekeleton />}

      {!loading && <Page
        breadcrumbs={[{ content: 'Admin panel', url: '/' }]}
        title={title}
      >
        <form >
          <Layout>
            <Layout.Section >
              <Card>
                <TextEditor
                  title={title}
                  setTitle={setTitle}
                  bodyHTML={bodyHTML}
                  setBodyHTML={setBodyHTML}
                />
              </Card>

              <Card title="Search engine listing preview" sectioned>
                <p>Add a title and description to see how this Page might appear in a search engine listing</p>
              </Card>
            </Layout.Section>

            <Layout.Section secondary>
              <Card title="Visibility" sectioned>
                <ChoiceList
                  choices={[
                    { label: 'Visible', value: 'visible' },
                    { label: 'Hidden', value: 'hidden' },
                  ]}
                  selected={visiblity}
                  onChange={handleChange}
                />
              </Card>

              <Card title="Online store" sectioned>
                <p>Add tags to your order Near.</p>
              </Card>
            </Layout.Section>





            <Layout.Section >
              <PageActions
                primaryAction={{
                  content: 'Save',
                  onAction: handleUpdatePage
                }}
                secondaryActions={[
                  {
                    content: 'Cancel',
                  },
                ]}
              />
            </Layout.Section>
          </Layout>

        </form>




      </Page>}
    </>
  );
}