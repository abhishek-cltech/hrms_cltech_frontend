export const navigation: any[] = [
  {
    "text": "Dashboard",
    "icon": "dashboard",
    "routerLink": "/admin"
},
{
    "text": "Recruiter",
    "icon": "supervisor_account",
    "routerLink": "/admin/recruiter"
},
{
    "text": "Applicant",
    "icon": "supervised_user_circle",
    "routerLink": "/admin/applicant"
},

{
    "text": "Master",
    "icon": "lock",
    "children": [
                {
                    "text": "Department",
                    "icon": "category",
                    "routerLink": "/admin/department"
                },
                {
                    "text": "Group Master",
                    "icon": "layers",
                    "routerLink": "/admin/group-master"
                },
            ]
},

{
    "text": "User",
    "icon": "person_add",
    "routerLink": "/admin/register-user"
},
// {
//     "text": "Suit",
//     "icon": "inventory_2",
//     "children": [{
//             "text": "Category",
//             "icon": "category",
//             "routerLink": "/product/category"
//         },
//         {
//             "text": "Sub Category",
//             "icon": "layers",
//             "routerLink": "/product/sub-category"
//         },
//         {
//             "text": "Product",
//             "icon": "all_inbox",
//             "routerLink": "/product/manage"
//         }
//     ]
// },
// {
//     "text": "Expense",
//     "icon": "inventory_2",
//     "children": [{
//             "text": "Category",
//             "icon": "category",
//             "routerLink": "/product/category"
//         },
//         {
//             "text": "Manage Expense",
//             "icon": "layers",
//             "routerLink": "/product/sub-category"
//         },
//         {
//             "text": "Statement",
//             "icon": "all_inbox",
//             "routerLink": "/product/manage"
//         }
//     ]
// },
// {
//     "text": "Purchases",
//     "icon": "receipt",
//     "children": [{
//             "text": "New Purchases",
//             "icon": "local_atm",
//             "routerLink": "/purchases/new"
//         },
//         {
//             "text": "Purchases History",
//             "icon": "history",
//             "routerLink": "/purchases/history"
//         }
//     ]
// },
// {
//     "text": "Sales",
//     "icon": "calculate",
//     "children": [{
//             "text": "New Sales",
//             "icon": "point_of_sale",
//             "routerLink": "/sales/add"
//         },
//         {
//             "text": "Sales History",
//             "icon": "history",
//             "routerLink": "/sales/history"
//         }
//     ]
// },
{
    "text": "Report",
    "icon": "cloud",
    "routerLink": "/admin/reports"
}
  ];