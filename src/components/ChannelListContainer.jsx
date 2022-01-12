import React, { useState } from 'react'
import { ChannelList, useChatContext } from 'stream-chat-react'
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import Cookies from 'universal-cookie';
import HospitalIcon from "../assets/hospital.png"
import ChatIcon from "../assets/chat.png"
import LogoutIcon from "../assets/logout.png"
const cookies = new Cookies();


const SideBar = ({ logout }) => (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <img src={ChatIcon} alt="ChatIcon" width="30" />
            </div>

        </div>

        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" onClick={logout}>
                <img src={LogoutIcon} alt="Hospital" width="30" />
            </div>

        </div>
    </div>
)

const CompanyHeader = () => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">wazapp</p>
    </div>
)

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team')
};

const customMessagingTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging')
};


const ChannelListContent = ({ ChannelContainer, isCreating, setIsCreating, isEditing, setIsEditing, createType, setCreateType , setToggleContainer }) => {
    const { client } = useChatContext();
    const logout = () => {
        cookies.remove('token');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('userId');
        cookies.remove('phoneNumber');
        cookies.remove('avatarURL')
        cookies.remove('hashedPassword');
        window.location.reload();
    }
    const filters = { members: { $in: [client.userID] } }
    return (
        <>
            <SideBar logout={logout} />
            <div className="channel-list__list__wrapper">
                <CompanyHeader />
                <ChannelSearch 
                setToggleContainer={setToggleContainer}
                />
                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={customChannelTeamFilter}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type='team'
                            ChannelContainer={ChannelContainer}
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                            setIsEditing={setIsEditing}
                            createType={createType}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            type="team"
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setCreateType={setCreateType}
                            type="team"
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                />

                <ChannelList
                    filters={filters}
                    channelRenderFilterFn={customMessagingTeamFilter}
                    List={(listProps) => (
                        <TeamChannelList
                            {...listProps}
                            type='messeging'
                            setCreateType={setCreateType}
                            setToggleContainer={setToggleContainer}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            type="messeging"
                            setCreateType={setCreateType}
                            setToggleContainer={setToggleContainer}

                        />
                    )}
                />
            </div>
        </>
    )
}


const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
    const [toggleContainer, setToggleContainer] = useState(false)
    const styles = {
        mobileStyle: {
            left: toggleContainer ? "0%" : "-89%",
            backgroundColor: '#005fff'
        }
    };
    return (
        <>
            <div className="channel-list__container">
                <ChannelListContent
                    setCreateType={setCreateType}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                />
            </div>
            <div className="channel-list__container-responsive" style={styles.mobileStyle}>
                <div className="channel-channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
                    <ChannelListContent
                        setCreateType={setCreateType}
                        setIsCreating={setIsCreating}
                        setIsEditing={setIsEditing}
                        setToggleContainer={setToggleContainer}
                    />
                </div>

            </div>
        </>
    )
}

export default ChannelListContainer
