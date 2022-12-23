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
                <TextField label="Title"
                  onChange={() => { }}
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
                      <iframe src="" frameborder="0">

                      </iframe>
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
              <p>Add tags to your order.</p>
            </Card>
          </Layout.Section>





          <Layout.Section >
            <PageActions
              primaryAction={{
                content: 'Save',
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