const url = 'http://188.131.134.15:8088/api/NothKingSystem/'

export const login = url + "admin/login"
export const login1 = url + "tologin"
export const test = url + "demo"

/**
 * 客户管理
 */
export const custQuery = "http://188.131.134.15:8088/cust/query" // 客户查询
export const custAdd = "http://188.131.134.15:8088/cust/add" // 客户添加
export const custUpdate = "http://188.131.134.15:8088/cust/update" // 客户编辑
export const custDel = "http://188.131.134.15:8088/cust/del" // 客户编辑

/**
 * 项目管理
 */
export const projectQuery = "http://188.131.134.15:8088/project/query" // 项目查询
export const projectAdd = "http://188.131.134.15:8088/project/add" // 项目添加
export const projectUpdate = "http://188.131.134.15:8088/project/upd" // 项目编辑
export const projectDel = "http://188.131.134.15:8088/project/del" // 项目编辑

/**
 * 需求管理
 */
export const requireAddRequire = "http://188.131.134.15:8088/require/addRequire"  // 添加接口

export const requireUpdateRequire = "http://188.131.134.15:8088/require/updateRequire" // 更新操作

export const requireSelectRequire = "http://188.131.134.15:8088/require/selectRequire" // 查询数据操作

export const requireDeleteRequire = "http://188.131.134.15:8088/require/deleteRequire" // 删除需求客户信息

export const requireSelectRequireCust = "http://188.131.134.15:8088/require/selectRequireCust" // 查询需求客户信息(头部枚举值)

export const requireSelectRequireByCustName = "http://188.131.134.15:8088/require/selectRequireByCustName" // 根据客户查询需求项目信息(头部枚举值)



/*
 * 用户管理接口
 */

 export const addUser = "http://188.131.134.15:8088/api/NothKingSystem/SysUsrMnger/insertUsrInfo" //添加用户
 export const queryUser = "http://188.131.134.15:8088/api/NothKingSystem/SysUsrMnger/queryUsrInfo" //查询用户信息
 export const userList = "http://188.131.134.15:8088/api/NothKingSystem/SysUsrMnger/querySelectUsr" //查询用户下拉框
 export const roleIdList = "http://188.131.134.15:8088/api/NothKingSystem/SysUsrMnger/querySelectRole" //查询角色下拉框
 export const delUser = "http://188.131.134.15:8088/api/NothKingSystem/SysUsrMnger/deleteUsrInfo" //删除用户
 export const editUser = "http://188.131.134.15:8088/api/NothKingSystem/SysUsrMnger/updateUsrInfo" //修改用户
 export const roleNameList = "http://188.131.134.15:8088/api/NothKingSystem/roleMngMenu/queryRoleMngMenuInfo"//角色管理名称下拉框

 export const urlfortest = "http://www.baidu.com"//下回·删掉

/**
 * 菜单管理
 * @type {string}
 */
export const queryMenu = "http://188.131.134.15:8088/api/NothKingSystem/menu/queryMenu";
export const updateMenuMngerInfo ="http://188.131.134.15:8088/api/NothKingSystem/menu/updateMenuMngerInfo";
// export const queryMenu = "http://127.0.0.1:8089/api/NothKingSystem/menu/queryMenu"

/**
 * 登录角色菜单管理
 */
export  const queryMenuByRoleId="http://188.131.134.15:8088/api/NothKingSystem/roleMngMenu/queryMenuByRoleId"
