import Creator, { CreatorSocial } from 'models/entities/Creator'
import { api } from './api'

class CreatorsService {
  async get(): Promise<Array<Creator>> {
    const { data } = await api.get<Array<any>>('/authors')
    return data.map<Creator>((_creator: Creator) => ({
      description: _creator.description ?? '',
      online: _creator.online ?? false,
      displayName: _creator.displayName ?? '',
      photo: _creator.photo,
      tags: _creator.tags ?? [],
      socials: _creator.socials?.map<CreatorSocial>(_social => ({
        link: _social.link,
        social: _social.social
      }))
    }))
  }
}

const creatorsService = new CreatorsService()
export default creatorsService
