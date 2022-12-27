import { useNavigate, TitleBar, Loading } from "@shopify/app-bridge-react";
import {
  Banner,
  Card,
  Icon,
  Layout,
  Page,
  Tabs,
  FooterHelp,
  Link
} from "@shopify/polaris";

import {
  LockMajor
} from '@shopify/polaris-icons';
import { useCallback, useState, useEffect, useRef, createRef } from "react";
import ResourceListWithFilter from "../components/ResourceListWithFilter";
import { useAuthenticatedFetch } from "../hooks";
import { headers } from "../custom-api";
import HomePageSkeleton from "../components/Skeleton/HomePageSkeleton";
import DeletePageModal from '../components/Modal/DeletePageModal'


export default function HomePage() {
  const navigate = useNavigate();
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  


  let fetchApi = useAuthenticatedFetch()

  const getPages = async () => {
    let res = await fetchApi('/api/pages', {
      method: "GET",
      headers
    })

    let data = await res.json()
    return data
  }

  useEffect(async () => {
    try {
      let data = await getPages()
      setPages(data)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }, [])




  const tabs = [
    {
      id: 1,
      query: "All",
      content: "All"
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

      {loading && <HomePageSkeleton />}

      {!loading && <Layout>
        <Layout.Section>
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
              <ResourceListWithFilter pageItems={pages}  />
            </Tabs>

          </Card>
        </Layout.Section>

        <Layout.Section>
          <FooterHelp>
            Learn more about{' '}
            <Link url="https://help.shopify.com/en/manual/online-store/themes/theme-structure/pages">
              pages
            </Link>
          </FooterHelp>
        </Layout.Section>
      </Layout>

      }

      {/* <DeletePageModal/> */}


    </Page>
  );
}