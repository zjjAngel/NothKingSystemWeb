
const url = 'http://146.56.200.9/api/NothKingSystem/'


export const login = url + "admin/login"
export const login1 = url + "tologin"
export const test = url + "demo"

/**
 * 客户管理
 */


export const custQuery = "http://146.56.200.9/api/cust/query" // 客户查询
export const custAdd = "http://146.56.200.9/api/cust/add" // 客户添加
export const custUpdate = "http://146.56.200.9/api/cust/update" // 客户编辑
export const custDel = "http://146.56.200.9/api/cust/del" // 客户编辑
export const queryForList = "http://146.56.200.9/api/cust/queryForList"  



/**
 * 项目管理
 */

export const projectQuery = "http://146.56.200.9/api/project/query" // 项目查询
export const projectAdd = "http://146.56.200.9/api/project/add" // 项目添加
export const projectUpdate = "http://146.56.200.9/api/project/upd" // 项目编辑
export const projectDel = "http://146.56.200.9/api/project/del" // 项目编辑
export const queryForListProd= "http://146.56.200.9/api/project/queryForList"



/**
 * 需求管理
 *///角色管理的编辑


export const requireAddRequire = "http://146.56.200.9/api/require/addRequire"  // 添加接口

export const requireUpdateRequire = "http://146.56.200.9/api/require/updateRequire" // 更新操作

export const requireSelectRequire = "http://146.56.200.9/api/NothKingSystem/require/selectRequire" // 查询数据操作

export const requireDeleteRequire = "http://146.56.200.9/api/require/deleteRequire" // 删除需求客户信息

export const requireSelectRequireCust = "http://146.56.200.9/api/require/selectRequireCust" // 查询需求客户信息(头部枚举值)

export const requireSelectRequireByCustName = "http://146.56.200.9/api/require/selectRequireByCustName" // 根据客户查询需求项目信息(头部枚举值)
export const RequireSearch = "http://146.56.200.9/api/require/selectRequire" // "http://146.56.200.9/require/selectRequire" //需求管理的搜索

export const queryPointWhere="http://146.56.200.9/api/NothKingSystem/require/queryPointWhere";


/*
 * 用户管理接口
 */


export const addUser = "http://146.56.200.9/api/NothKingSystem/SysUsrMnger/insertUsrInfo" //添加用户
export const queryUser = "http://146.56.200.9/api/NothKingSystem/SysUsrMnger/queryUsrInfo" //查询用户信息
export const userList = "http://146.56.200.9/api/NothKingSystem/SysUsrMnger/querySelectUsr" //查询用户下拉框
export const roleIdList = "http://146.56.200.9/api/NothKingSystem/SysUsrMnger/querySelectRole" //查询角色下拉框
export const delUser = "http://146.56.200.9/api/NothKingSystem/SysUsrMnger/deleteUsrInfo" //删除用户
export const editUser = "http://146.56.200.9/api/NothKingSystem/SysUsrMnger/updateUsrInfo" //修改用户
export const roleNameList = "http://146.56.200.9/api/NothKingSystem/roleMngMenu/queryRoleMngMenuInfo"//角色管理名称下拉框


 export const roleDelete = "http://146.56.200.9/api/NothKingSystem/roleMngMenu/deleteRoleById"//角色删除
 export const roleAdd ="http://146.56.200.9/api/NothKingSystem/roleMngMenu/insertRoleMngMeNuInfo"//角色增加
 export const ROleEdit="http://146.56.200.9/api/NothKingSystem/roleMngMenu/modifyRoleMngMeNuInfo"//角色管理的编辑
/**
 * 菜单管理
 * @type {string}
 */


export const queryMenu = "http://146.56.200.9/api/NothKingSystem/menu/queryMenu";
export const updateMenuMngerInfo ="http://146.56.200.9/api/NothKingSystem/menu/updateMenuMngerInfo";
// export const queryMenu = "http://127.0.0.1:8089/api/NothKingSystem/menu/queryMenu"

export const Menudelet ="http://146.56.200.9/api/NothKingSystem/menu/deleteMenu"//菜单删除
export const MenuAdd ="http://146.56.200.9/api/NothKingSystem/menu/insertMenuMngerInfo" 


/**
 * 登录角色菜单管理
 */

export  const queryMenuByRoleId="http://146.56.200.9/api/NothKingSystem/roleMngMenu/queryMenuByRoleId";
export  const  queryMenuByNextLevel="http://146.56.200.9/api/NothKingSystem/roleMngMenu/queryMenuByNextLevel";


