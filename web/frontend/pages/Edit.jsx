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
  ChoiceList,
  Frame
} from "@shopify/polaris";


import { useCallback, useState, useEffect, useRef } from "react";
import { useAuthenticatedFetch } from "../hooks";

import { headers } from "../custom-api";
import { SinglePageSekeleton } from "../components/Skeleton/SinglePageSekeleton";
import TextEditor from '../components/TextEditor'
import ToastMessage from "../components/ToastMessage";
import DeletePageModal from "../components/Modal/DeletePageModal";
import EnginePreview from "../components/EnginePreview";

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
  const navigate = useNavigate()
  let id = new URLSearchParams(location.search).get("id")
  let fetchApi = useAuthenticatedFetch()

  // Title and editable area
  const [title, setTitle] = useState("")
  const [bodyHTML, setBodyHTML] = useState("")
  const [handle, setHandle] = useState("")


  const [loading, setLoading] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const [toastActive, setToastActive] = useState(false)
  const [toastContent, setToastContent] = useState("")

  // Delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)


  // radio button visiblity
  const [visiblity, setVisiblity] = useState(['visible']);
  const handleChange = useCallback((value) => setVisiblity(value), []);

  // store initial values for comparison
  const [initTitle, setInitTitle] = useState("")
  const [initBodyHTML, setInitBodyHTML] = useState("")
  const [initVisibility, setInitVisibility] = useState("")



  const getSinglePage = async () => {
    let res = await fetchApi(`/api/pages/${id}`, {
      method: "GET",
      headers
    })

    let data = await res.json()
    return data
  }


  const deleteSinglePage = async (id) => {
    await fetchApi(`/api/pages/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json'
      }
    })
    setToastActive(true)
    setToastContent("Page deleted")
    navigate("/")

  }




  // determine i f
  const isContentUnchanged = (title == initTitle) && (bodyHTML == initBodyHTML) && (visiblity[0] == initVisibility)


  const handleUpdatePage = async () => {
    try {
      setBtnLoading(true)
      let res = await fetchApi(`/api/pages/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: 'application/json'
        },
        body: JSON.stringify({
          isShown: visiblity[0] == 'visible',
          title: title,
          body_html: bodyHTML
        })
      })

      let data = await res.json()
      console.log(data)
      setBtnLoading(false)
      setToastActive(true)
      setToastContent("Page was saved")

      // setInitData for new values
      setInitTitle(data.title)
      setInitBodyHTML(data.body_html)
      setInitVisibility(data.published_at ? 'visible' : 'hidden')
    } catch (error) {
      console.log(error)
    }

  }

  // text editor
  useEffect(async () => {
    try {
      setLoading(true)
      let data = await getSinglePage()
      console.log(data)

      setTitle(data.title)
      setInitTitle(data.title)

      setBodyHTML(data.body_html)
      setInitBodyHTML(data.body_html)

      setHandle(data.handle)
      setLoading(false)
      data.published_at ? setVisiblity(['visible']) : setVisiblity(['hidden'])
      setInitVisibility(data.published_at ? 'visible' : 'hidden')

    } catch (error) {
      console.log(error)
    }
  }, [id]);





  return (
    <Frame>
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

              <EnginePreview
                title={title}
                bodyHTML={bodyHTML}
                urlHandle={handle}
              />
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
                <p>Add tags to your order</p>
              </Card>
            </Layout.Section>



            <Layout.Section >
              <PageActions
                primaryAction={
                  <Button
                    primary
                    onClick={handleUpdatePage}
                    loading={btnLoading}
                    disabled={isContentUnchanged}
                  >Save</Button>
                }
                secondaryActions={[
                  {
                    content: 'Delete',
                    destructive: true,
                    onAction: () => setIsDeleteModalOpen(true)
                  },
                ]}
              />
            </Layout.Section>
          </Layout>

        </form>

        <ToastMessage
          toastActive={toastActive}
          toastContent={toastContent}
          setToastActive={setToastActive}
        />


      </Page>}

      <DeletePageModal
        type='single'
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        deleteSinglePage={deleteSinglePage}
        id={id}
      />
    </Frame>
  );
}