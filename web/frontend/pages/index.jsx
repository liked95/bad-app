import { useNavigate, TitleBar, Loading } from "@shopify/app-bridge-react";
import {
  Banner,
  Card,
  EmptyState,
  Icon,
  Layout,
  Page,
  ResourceList,
  SkeletonBodyText,
  Tabs,
  Spinner,
  Button
} from "@shopify/polaris";

import {
  LockMajor
} from '@shopify/polaris-icons';
import { useCallback, useState, useEffect } from "react";
import ResourceListWithFilter from "../components/ResourceListWithFilter";
import { useAuthenticatedFetch } from "../hooks";


export default function HomePage() {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)


  let fetchApi = useAuthenticatedFetch()

  const getPages = async () => {
    let res = await fetchApi('/api/pages', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: 'application/json'
      }
    })

    let data = await res.json()
    return data
  }

  useEffect(async () => {
    let data = await getPages()
    setPages(data)
    setLoading(false)
  }, [])




  const navigate = useNavigate();
  const tabs = [
    {
      id: 1,
      query: "All",
      content: "All"
    },
    {
      id: 2,
      query: "Custom 1",
      content: "Custom 1"
    },
    {
      id: 3,
      query: "Custom 2",
      content: "Custom 2"
    },
  ]

  const [selected, setSelected] = useState(0)

  const handleTabChange = useCallback((tabIndex) => setSelected(tabIndex), [])

  const handleClickBanner = () => {
    console.log("ClickedBanner")
  }

  const LockIcon = () => <Icon source={LockMajor} color="base" />


  return (
    <Page
      title="My Shopify Pages"
      primaryAction={{ content: "Add page", onAction: () => navigate("/addpage") }}
    >

      {loading && <Layout>
        <Spinner></Spinner>
      </Layout>}

      {!loading && <Layout>
        <Layout.Section>
          <Button onClick={getPages}>GET PAGES</Button>
          <Button>CREATE PAGES</Button>
          <Banner
            status="info"
            icon={LockIcon}
            title="Store access is restricted"
            action={{ content: "See store password", onAction: () => getPages() }}
          >
            <p>While your online store is in development, only visitors with the password can access it.</p>

          </Banner>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
              <ResourceListWithFilter query={tabs[selected].query} pages = {pages}/>
            </Tabs>

          </Card>
        </Layout.Section>
      </Layout>}


    </Page>
  );
}