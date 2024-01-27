/**
 * 用户登录
 * @param email
 * @param password
 * @returns {Promise<{code:int, msg:string, data:{token:string}}|null>}
 */
export async function userLogin(email, password) {
    const response = await commonFetch(
        `${import.meta.env.VITE_APP_API_URL}/api/user/login`,
        'POST',
        {email: email, password: password}
    )

    return commonResponseProcess(response);
}

//userRegister
export async function userRegister(email, password) {
    const response = await commonFetch(
        `${import.meta.env.VITE_APP_API_URL}/api/user/register`,
        'POST',
        {email: email, name: email, password: password, avatar: "default"}
    )

    return commonResponseProcess(response);
}

/**
 * 创建机器人
 * @param name
 * @param avatar
 * @param desc
 * @returns {Promise<{code:int, msg:string, data:{}}|null>}
 */
export async function botCreate(name, avatar, desc) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/bot/create`,
        'POST',
        {name: name, avatar: avatar, desc: desc},
    )

    return commonResponseProcess(response);
}

// botReplicate
export async function botReplicate(botId, origin_type) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/bot/replicate`,
        'POST',
        {id: botId, origin_type: origin_type},
    )

    return commonResponseProcess(response);
}

/**
 * 机器人更新
 * @param botId
 * @param name
 * @param avatar
 * @param desc
 * @returns {Promise<{code:int, msg:string, data:{}}|null>}
 */
export async function botUpdate(botId, name, avatar, desc) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/bot/update`,
        'POST',
        {id: botId, name: name, avatar: avatar, desc: desc},
    )

    return commonResponseProcess(response);
}

/**
 * 机器人提示词更新
 * @param botId
 * @param prompt
 * @returns {Promise<{code:int, msg:string, data:{}}|null>}
 */
export async function botPromptUpdate(botId, prompt) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/bot/prompt/update`,
        'POST',
        {id: botId, prompt: prompt},
    )

    return commonResponseProcess(response);
}

/**
 * 机器人聊天
 * @param botId
 * @param message
 * @returns {Promise<{code:int, msg:string, data:{ message_id:string}}>}
 */
export async function botChat(botId, message) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/bot/chat`,
        'POST',
        {bot_id: botId, msg: message}
    )

    return commonResponseProcess(response);
}

/**
 * 机器人聊天记录
 * @param botId
 * @returns {Promise<{code:int, msg:string, data:{list:[{role:string,content:{mime_type:string,data:string}}]}}>}
 */
export async function botChatHistory(botId) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/bot/chat/history`,
        'POST',
        {bot_id: botId}
    )

    return commonResponseProcess(response);
}

/**
 * 机器人聊天记录清空
 * @param botId
 * @returns {Promise<{code:int, msg:string, data:{}}|any|undefined>}
 */
export async function botChatHistoryClear(botId) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/bot/chat/history/clear`,
        'POST',
        {bot_id: botId}
    )

    return commonResponseProcess(response);
}

/**
 *
 * @param page
 * @param pageSize
 * @returns {Promise<{code:int, msg:string, data:{total:int, list:any, page:int, page_size:int}|null}>}
 */
export async function botList(page, pageSize) {

    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/bot/list`,
        'POST',
        {page: page, page_size: pageSize}
    )

    return commonResponseProcess(response);
}

/**
 *
 * @param botId
 * @returns {Promise<{code:int, msg:string, data:{}}|null>}
 */
export async function botDelete(botId) {

    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/bot/delete`,
        'POST',
        {id: botId}
    )

    return commonResponseProcess(response);
}

/**
 *
 * @param botId
 * @returns {Promise<{code:int, msg:string, data:{id:int, name:string, avatar:string, desc:string, prompt:string}}|null>}
 */
export async function botDetail(botId) {

    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/bot/detail`,
        'POST',
        {id: botId}
    )

    return commonResponseProcess(response);
}

/**
 *
 * @param page
 * @param pageSize
 * @returns {Promise<{code:int, msg:string, data:{total:int, list:any, page:int, page_size:int}|null}>}
 */
export async function exploreBotList(page, pageSize) {

    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/bot/explore/list`,
        'POST',
        {page: page, page_size: pageSize}
    )

    return commonResponseProcess(response);
}

/**
 * 优化机器人提示词
 *
 * @param botId
 * @param prompt
 * @returns {Promise<{code:int, msg:string, data:{ message_id:string}}>}
 */
export async function botOptimizePrompt(botId, prompt) {

    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/bot/prompt/optimize`,
        'POST',
        {id: botId, prompt: prompt}
    )

    return commonResponseProcess(response);
}

/**
 * 机器人客服列表
 * @param page
 * @param pageSize
 * @returns {Promise<{code:int, msg:string, data:{total:int, list:{open_kf_id:string, name:string, avatar:string, manage_privilege:bool}, page:int, page_size:int}}>}
 */
export async function botCustomerList(page, pageSize) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/bot/customer/list`,
        'POST',
        {page: page, page_size: pageSize}
    )

    return commonResponseProcess(response);
}

//客户机器人绑定
export async function botCustomerBind(botId, openKfId) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/bot/customer/update`,
        'POST',
        {bot_id: botId, open_kfid: openKfId}
    )

    return commonResponseProcess(response);
}

/**
 * 获取机器人模型详情
 * @param botId
 * @returns {Promise<{code:int, msg:string, data:{model_type:string, model_name:string, temperature:float}}|null>}
 */
export async function botModelDetail(botId) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/bot/model/detail`,
        'POST',
        {bot_id: botId}
    )

    return commonResponseProcess(response);
}

/**
 * 更新机器人模型
 * @param botId
 * @param modelType
 * @param modelName
 * @param temperature
 * @returns {Promise<null|any|undefined>}
 */
export async function botModelUpdate(botId, modelType, modelName, temperature) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/bot/model/update`,
        'POST',
        {bot_id: botId, model_type: modelType, model_name: modelName, temperature: temperature}
    )

    return commonResponseProcess(response);
}

/**
 * 创建知识库
 * @param name
 * @param avatar
 * @param desc
 * @returns {Promise<null|any|undefined|{code:int, msg:string, data:{id:int}}>}
 */
export async function knowledgeCreate(name, avatar, desc) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/knowledge/create`,
        'POST',
        {name: name, avatar: avatar, desc: desc},
    )

    return commonResponseProcess(response);
}

/**
 * 更新知识库
 * @param knowledgeId
 * @param name
 * @param avatar
 * @param desc
 * @returns {Promise<null|any|undefined|{code:int, msg:string, data:{}}>}
 */
export async function knowledgeUpdate(knowledgeId, name, avatar, desc) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/knowledge/update`,
        'POST',
        {id: knowledgeId, name: name, avatar: avatar, desc: desc},
    )

    return commonResponseProcess(response);
}

/**
 * 删除知识库
 * @param knowledgeId
 * @returns {Promise<null|any|undefined|{code:int, msg:string, data:{}}>}
 */
export async function knowledgeDelete(knowledgeId) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/knowledge/delete`,
        'POST',
        {id: knowledgeId},
    )

    return commonResponseProcess(response);
}

/**
 * 知识库列表
 * @param page
 * @param pageSize
 * @returns {Promise<null|any|undefined|{code:int, msg:string, data:{
 * total:int, list:[
 *  {id:int, name:string, avatar:string, desc:string, create_time:string, update_time:string}
 * ]}}>}
 */
export async function knowledgeList(page, pageSize) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/knowledge/list`,
        'POST',
        {page: page, page_size: pageSize},
    )

    return commonResponseProcess(response);
}

/**
 * 创建知识单元
 * @param knowledgeId
 * @param name
 * @returns {Promise<null|any|undefined|{code:int, msg:string, data:{id:int}}>}
 */
export async function knowledgeUnitCreate(knowledgeId, name) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/knowledge/unit/create`,
        'POST',
        {knowledge_id: knowledgeId, name: name},
    )

    return commonResponseProcess(response);
}

//knowledgeUnitUpdate
export async function knowledgeUnitUpdate(unitId, name) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/knowledge/unit/update`,
        'POST',
        {id: unitId, name: name},
    )

    return commonResponseProcess(response);
}

/**
 * 知识单元列表
 * @param knowledgeId
 * @param page
 * @param pageSize
 * @returns {Promise<null|any|undefined>}
 */
export async function knowledgeUnitList(knowledgeId, page, pageSize) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/knowledge/unit/list`,
        'POST',
        {knowledge_id: knowledgeId, page: page, page_size: pageSize},
    )

    return commonResponseProcess(response);
}

/**
 * 知识单元详情
 * @param unitId
 * @returns {Promise<null|any|undefined>}
 */
export async function knowledgeUnitDetail(unitId) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/knowledge/unit/detail`,
        'POST',
        {id: unitId},
    )

    return commonResponseProcess(response);
}

/**
 * 删除知识单元
 * @param unitId
 * @returns {Promise<null|any|undefined>}
 */
export async function knowledgeUnitDelete(unitId) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/knowledge/unit/delete`,
        'POST',
        {id: unitId},
    )

    return commonResponseProcess(response);
}

/**
 * 知识单元切换
 * @param unitId
 * @returns {Promise<null|any|undefined>}
 */
export async function knowledgeUnitSwitch(unitId) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/knowledge/unit/switch`,
        'POST',
        {id: unitId},
    )

    return commonResponseProcess(response);
}

/**
 * 创建知识片段
 * @param knowledgeId
 * @param knowledgeUnitId
 * @param value
 * @returns {Promise<null|any|undefined>}
 */
export async function knowledgeSegmentCreate(knowledgeId, knowledgeUnitId, value) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/knowledge/segments/create`,
        'POST',
        {knowledge_id: knowledgeId, knowledge_unit_id: knowledgeUnitId, value: value},
    )

    return commonResponseProcess(response);
}

/**
 * 更新知识片段
 * @param segmentId
 * @param value
 * @returns {Promise<null|any|undefined>}
 */
export async function knowledgeSegmentUpdate(segmentId, value) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/knowledge/segments/update`,
        'POST',
        {id: segmentId, value: value},
    )

    return commonResponseProcess(response);
}

/**
 * 获取知识片段列表
 * @param knowledgeId
 * @param knowledgeUnitId
 * @param page
 * @param pageSize
 * @returns {Promise<null|any|undefined>}
 */
export async function getKnowledgeSegmentList(knowledgeId, knowledgeUnitId, page, pageSize) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/knowledge/segments/list`,
        'POST',
        {knowledge_id: knowledgeId, knowledge_unit_id: knowledgeUnitId, page: page, page_size: pageSize},
    )

    return commonResponseProcess(response);
}

/**
 * 删除知识片段
 * @param segmentId
 * @returns {Promise<null|any|undefined|{code:int, msg:string, data:{}}>}
 */
export async function knowledgeSegmentDelete(segmentId) {
    const response = await commonFetchWithToken(
        `${import.meta.env.VITE_APP_API_URL}/api/knowledge/segments/delete`,
        'POST',
        {id: segmentId},
    )

    return commonResponseProcess(response);
}


function commonFetch(url, method, body) {
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}

function commonFetchWithToken(url, method, body) {
    const token = localStorage.getItem("token");
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(body)
    });
}

async function commonResponseProcess(response) {
    if (!response.ok) {
        console.error("HTTP error, status = " + response.status);
        return null
    } else {
        const text = await response.text();
        console.log(text);
        try {
            const data = JSON.parse(text);
            console.log(data);
            return data;
        } catch (err) {
            console.error("This doesn't look like a valid JSON: ", text);
            return null;
        }
    }
}