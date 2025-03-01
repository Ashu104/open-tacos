// import * as HoverCard from '@radix-ui/react-hover-card'
import { OrganizationType } from '../../js/types'
import Tooltip from '../../components/ui/Tooltip'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { UsersIcon } from '@heroicons/react/24/outline'

export interface LCOProfileType {
  /** Org unique id  */
  id: string
  /** An array of area IDs under the org care */
  areaIdList: string[]
  /** Official name */
  name: string
  description: string
  email?: string
  facebook?: string
  /** IG Url */
  instagram?: string
  /** Official website */
  website?: string
  /** Bad hardware report form url */
  report?: string
  /** Donation url */
  donation?: string
}

interface PageBannerProps{orgs: OrganizationType[]}

const getLcoList = (orgs): LCOProfileType[] => {
  return orgs.filter(org => org.orgType === 'LOCAL_CLIMBING_ORGANIZATION')
    .map(org => ({
      id: org.orgId,
      areaIdList: org.associatedAreaIds ?? [],
      name: org.displayName,
      description: org.content?.description ?? '',
      email: org.content?.email,
      website: org.content?.website,
      facebook: org.content?.facebookLink,
      instagram: org.content?.instagramLink,
      report: org.content?.hardwareReportLink,
      donation: org.content?.donationLink
    }))
}
/**
 * Display LCO banner if there is one.  An area may have multiple LCOs.
 */
export const PageBanner: React.FC<PageBannerProps> = ({ orgs }) => {
  const lcoList = getLcoList(orgs)

  return (
    <div className='grid pt-6 pb-4 lg:pb-16 lg:pt-16'>
      <div className='col-span-full flex justify-start items-center pb-6'>
        <h3 className='mr-4'>Local climbing organizations</h3>
        <Tooltip content={
          <p>Learn more about our&nbsp;
            <a href='https://openbeta.substack.com/p/openbeta-and-lcos' target='_blank' rel='noreferrer' className='underline'>
              initiative
            </a>.
          </p>
        }
        >
          <InformationCircleIcon className='h-6 w-6' />
        </Tooltip>
      </div>
      <div>
        {lcoList.length === 0
          ? (
            <p className='italic text-base-content/60'>
              No organizationa found for this area
            </p>
            )
          : (
              lcoList.map((orgProfile) => (
                <IndividualBanner key={orgProfile.id} profile={orgProfile} />
              ))
            )}
      </div>
    </div>
  )
}

const IndividualBanner: React.FC<ContentProps> = ({ profile }) => (
  <>
    <div className='sm:inline-block mr-6 mb-6'>
      <div className='flex items-center bg-light hover:bg-on-hover pl-5 pr-7 rounded-2xl'>
        <UsersIcon className='h-10 w-10' />
        <div className='py-5  pl-4 overflow-hidden'>
          <p className='text-base leading-6'>{profile.name}</p>
          <p className='text-xs underline'>
            <a href={profile.website} target='_blank' rel='noreferrer'>{profile.website}</a>
          </p>
        </div>
      </div>
    </div>
  </>
)

interface ContentProps {
  profile: LCOProfileType
}

// Previous implementation using hover card
// const IndividualBanner: React.FC<ContentProps> = ({ profile }) => (
//  <HoverCard.Root openDelay={300}>
//    <HoverCard.Trigger>
//      <ContentTrigger profile={profile} />
//    </HoverCard.Trigger>
//    <HoverCard.Portal>
//      <HoverCard.Content sideOffset={10} side='top' className='z-40'>
//        <Card profile={profile} />
//      </HoverCard.Content>
//    </HoverCard.Portal>
//  </HoverCard.Root>
// )

// const ContentTrigger: React.FC<ContentProps> = ({ profile }) => {
//  const { name, website } = profile
//  return (
//    <a
//      className='block uppercase hover:underline font-medium'
//      href={website}
//      target='_blank'
//      rel='noreferrer'
//    >
//      {name}
//    </a>
//  )
// }

// const Card: React.FC<ContentProps> = ({ profile }) => {
//  const { name, website, instagram, report, donation } = profile
//  return (
//    <div className='card w-96 bg-secondary shadow-xl z-50 overflow-clip border-base-200'>
//      <div className='p-8 pt-10'>
//        <h2 className='card-title my-2 uppercase'>{name}</h2>
//        <div className='flex gap-4'>
//          <a className='badge badge-outline opacity-60' href={website} target='_blank' rel='noreferrer'>website</a>
//          <a className='badge badge-outline opacity-60' href={instagram} target='_blank' rel='noreferrer'>instagram</a>
//          {donation != null && <a className='badge opacity-60 px-4' href={donation} target='_blank' rel='noreferrer'>Donate</a>}
//        </div>
//      </div>
//      <div className='card-actions bg-base-100 flex justify-end p-4'>
//        <a className='btn btn-primary btn-sm opacity-80' href={report} target='_blank' rel='noreferrer'>Report bad bolts</a>
//      </div>
//    </div>
//  )
// }
