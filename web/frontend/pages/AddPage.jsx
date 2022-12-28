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

import { useCallback, useState } from "react";
import { useAuthenticatedFetch } from "../hooks";

import TextEditor from '../components/TextEditor'
import Toast from "../components/ToastMessage";
import ToastMessage from "../components/ToastMessage";
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

export default function AddPage() {
  const navigate = useNavigate();
  let fetchApi = useAuthenticatedFetch()

  // Title and editable area
  const [title, setTitle] = useState("")
  const [bodyHTML, setBodyHTML] = useState("")
  const [btnLoading, setBtnLoading] = useState(false)
  const [toastActive, setToastActive] = useState(false)
  const [toastContent, setToastContent] = useState("")

  console.log(bodyHTML)

  // radio button visiblity
  const [visiblity, setVisiblity] = useState(['visible']);
  const handleChange = useCallback((value) => setVisiblity(value), []);
  // console.log(bodyHTML)

  const handleCreatePage = async () => {
    try {
      setBtnLoading(true)
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
      setBtnLoading(false)
      setToastActive(true)
      setToastContent("Page was created")
      navigate(`/edit?id=${data.id}`)
    } catch (error) {
      console.log(error)
    }
  }






  return (
    <Frame>
      <Page
        breadcrumbs={[{ content: 'Admin panel', url: '/' }]}
        title={"Add page"}
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
                <p>Add tags to your order Near.</p>
              </Card>
            </Layout.Section>





            <Layout.Section >
              <PageActions
                primaryAction={
                  <Button
                    primary
                    onClick={handleCreatePage}
                    loading={btnLoading}
                  >Create</Button>
                }
                secondaryActions={[
                  {
                    content: 'Cancel',
                    onAction: () => navigate("/")
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
      </Page>
    </Frame>
  );
}