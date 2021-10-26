import { useState, useEffect } from 'react'
import Default from 'layouts/Default'
import Creator from 'models/entities/Creator'
import { GetStaticProps, GetStaticPropsResult } from 'next'
import Head from 'next/head'
import creatorsService from 'services/creatorService'
import { getFromCache } from 'small-cache'
import * as S from './styles'
import * as C from 'components'

type CreatorsProps = {
  preloadedCreators: Creator[]
  date: string
}

export default function Creators({ preloadedCreators, date }: CreatorsProps) {
  const [creators, setCreators] = useState<Creator[]>(preloadedCreators)

  /*
  useEffect(() => {
    const fetchCreators = async () => {
      const _creators = await getFromCache(
        'creators',
        async () => await creatorsService.get(),
        {
          TTL_InSeconds: 5,
          enabled: true
        }
      )
      setCreators(_creators)
    }
    fetchCreators()
  }, [])
  */

  return (
    <>
      <Head>
        <title>Creators - Conheça Nossos Criadores de Conteúdos</title>
      </Head>
      <S.Container>
        {creators.map(creator => (
          <C.CardCreators
            key={creator.displayName}
            description={creator.description}
            photo={creator.photo}
            online={creator.online}
            socials={creator.socials}
            displayName={creator.displayName}
            tags={creator.tags}
          />
        ))}
        <p>{date}</p>
      </S.Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<CreatorsProps>
> => {
  let preloadedCreators = await creatorsService.get()
  preloadedCreators = preloadedCreators.map<Creator>(creator => ({
    ...creator,
    online: false,
    socials: []
  }))
  const _refreshInSeconds = 60
  const date = new Date().toUTCString()

  return {
    props: {
      preloadedCreators,
      date
    },
    revalidate: _refreshInSeconds
  }
}

Creators.Layout = Default
