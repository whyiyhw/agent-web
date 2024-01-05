/**
 * 用户登录
 * @param email
 * @param password
 * @returns {Promise<{code:int, msg:string, data:{token:string}}|null>}
 */
export async function userLogin(email, password) {
    const response = await commonFetch(
        `${process.env.REACT_APP_API_URL}/api/user/login`,
        'POST',
        {email: email, password: password}
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
        `${process.env.REACT_APP_API_URL}/api/bot/create`,
        'POST',
        {name: name, avatar: avatar, desc: desc},
    )

    return commonResponseProcess(response);
}

// botReplicate
export async function botReplicate(botId, origin_type) {
    const response = await commonFetchWithToken(
        `${process.env.REACT_APP_API_URL}/api/bot/replicate`,
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
        `${process.env.REACT_APP_API_URL}/api/bot/update`,
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
        `${process.env.REACT_APP_API_URL}/api/bot/prompt/update`,
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
        `${process.env.REACT_APP_API_URL}/api/bot/chat`,
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
        `${process.env.REACT_APP_API_URL}/api/bot/chat/history`,
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
        `${process.env.REACT_APP_API_URL}/api/bot/chat/history/clear`,
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
        `${process.env.REACT_APP_API_URL}/api/bot/list`,
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
        `${process.env.REACT_APP_API_URL}/api/bot/delete`,
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
        `${process.env.REACT_APP_API_URL}/api/bot/detail`,
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
        `${process.env.REACT_APP_API_URL}/api/bot/explore/list`,
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
        `${process.env.REACT_APP_API_URL}/api/bot/prompt/optimize`,
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
        `${process.env.REACT_APP_API_URL}/api/bot/customer/list`,
        'POST',
        {page: page, page_size: pageSize}
    )

    return commonResponseProcess(response);
}

//客户机器人绑定
export async function botCustomerBind(botId, openKfId) {
    const response = await commonFetchWithToken(
        `${process.env.REACT_APP_API_URL}/api/bot/customer/update`,
        'POST',
        {bot_id: botId, open_kfid: openKfId}
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