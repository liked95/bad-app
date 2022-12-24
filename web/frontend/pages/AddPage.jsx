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
  Button

} from "@shopify/polaris";

import { useCallback, useState } from "react";
import { useAuthenticatedFetch } from "../hooks";

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

  const [title, setTitle] = useState("")
  const [textValue, setTextValue] = useState("")

  const handleCreatePage = async () => {
    let res = await fetchApi('/api/pages', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json'
      },
      body: JSON.stringify(
        {
          title: title,
          body_html: textValue
        }
      )
    })

    let data = await res.json()
    console.log(data)
  }






  return (
    <Page
      breadcrumbs={[{ content: 'Admin panel', url: '/' }]}
      title="Add page"
    >
      <form >
        <Layout>
          <Layout.Section >
            <Card sectioned>
              <FormLayout>
                <TextField
                  label="Title"
                  value={title}
                  onChange={value => setTitle(value)}
                  autoComplete="off" />


                <div>
                  <p> Content</p>
                  <ContentWrapper>
                    <ToolWrapper>
                      <Stack wrap={false}>

                        <Stack.Item fill>
                          <Stack spacing="tight">
                            <Stack.Item>
                              <ButtonGroup segmented>
                                <Button size="slim">Bold</Button>
                                <Button size="slim">Italic</Button>
                                <Button size="slim">Underline</Button>
                              </ButtonGroup>
                            </Stack.Item>

                            <Stack.Item>
                              <ButtonGroup segmented>
                                <Button size="slim">Bold</Button>
                                <Button size="slim">Italic</Button>
                                <Button size="slim">Bad</Button>
                              </ButtonGroup>
                            </Stack.Item>

                            <Stack.Item>
                              <ButtonGroup segmented>
                                <Button size="slim">Bold</Button>
                                <Button size="slim">Italic</Button>
                              </ButtonGroup>
                            </Stack.Item>

                            <Stack.Item>
                              <ButtonGroup segmented>
                                <Button size="slim">Bold</Button>
                                <Button size="slim">Italic</Button>
                                <Button size="slim">Bold</Button>
                                <Button size="slim">Italic</Button>
                                <Button size="slim">Bold</Button>
                              </ButtonGroup>
                            </Stack.Item>
                          </Stack>
                        </Stack.Item>


                        <Stack.Item >
                          <Button size="slim">Right</Button>
                        </Stack.Item>

                      </Stack>
                    </ToolWrapper>

                    <IframeWrapper>
                      <textarea
                        value={textValue}
                        onChange={e => setTextValue(e.target.value)}>

                      </textarea>
                    </IframeWrapper>
                  </ContentWrapper>
                </div>


              </FormLayout>
            </Card>

            <Card title="Search engine listing preview" sectioned>
              <p>Add tags to your order.</p>
            </Card>
          </Layout.Section>

          <Layout.Section secondary>
            <Card title="Visibility" sectioned>
              <p>Add tags to your order.</p>
            </Card>

            <Card title="Online store" sectioned>
              <p>Add tags to your order Near.</p>
            </Card>
          </Layout.Section>





          <Layout.Section >
            <PageActions
              primaryAction={{
                content: 'Save',
                onAction: handleCreatePage
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


    </Page>
  );
}