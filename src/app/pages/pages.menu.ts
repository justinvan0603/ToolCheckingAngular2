

export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'messages',
        data: {
          menu: {
            title: 'Thông báo',
            icon: 'ion-android-notifications-none',
            selected: false,
            expanded: false,
            order: 500,
          }
        },
        children: [
          {
            path: 'messagelist',
            data: {
              menu: {
                title: 'Danh sách thông báo',
              }
            }
          }
        ]
      },

      {
        path: 'users',
        data: {
          menu: {
            title: 'Người dùng',
            icon: 'ion-person',
            selected: false,
            expanded: false,
            order: 500,
          }
        },
        children: [
          // {
          //   path: 'userlist',
          //   data: {
          //     menu: {
          //       title: 'Danh sách User',
          //     }
          //   }
          // }
          // ,
          {
            path: 'usergroup',
            data: {
              menu: {
                title: 'Nhóm người dùng',
              }
            }
          }
          ,
          {
            path: 'usermanager',
            data: {
              menu: {
                title: 'Danh sách User',
              }
            }
          } ,
          {
            path: 'userrole',
            data: {
              menu: {
                title: 'Quyền hệ thống',
              }
            }
          }
        ]
      },
      {
        path: 'messageconfigurations',
        data: {
          menu: {
            title: 'Cấu hình',
            icon: 'ion-gear-a',
            selected: false,
            expanded: false,
            order: 500,
          }
        },
        children: [
          {
            path: 'messageconfigurationslist',
            data: {
              menu: {
                title: 'Cấu hình thông báo',
              }
            }
          }
        ]
      },
      {
        path: 'domains',
        data: {
          menu: {
            title: 'Domain',
            icon: 'ion-link',
            selected: false,
            expanded: false,
            order: 500,
          }
        },
        children: [
          {
            path: 'domainlist',
            data: {
              menu: {
                title: 'Danh sách Domain',
              }
            }
          }
        ]
      },
      // {
      //   path: 'tables',
      //   data: {
      //     menu: {
      //       title: 'Tables',
      //       icon: 'ion-grid',
      //       selected: false,
      //       expanded: false,
      //       order: 500,
      //     }
      //   },



      //   children: [
      //     {
      //       path: 'basictables',
      //       data: {
      //         menu: {
      //           title: 'Basic Tables',
      //         }
      //       }
      //     },
      //     {
      //       path: 'smarttables',
      //       data: {
      //         menu: {
      //           title: 'Smart Tables',
      //         }
      //       }
      //     }
      //   ]
      // },

      {
        path: '',
        data: {
          menu: {
            title: 'Menu',
            icon: 'ion-document',
            selected: false,
            expanded: false,
            order: 650,
          }
        },
        children: [
          {
            path: ['menu'],
            data: {
              menu: {
                title: 'Menu'
              }
            }
          }

        ]
      },

    //   {
    //     path: '',
    //     data: {
    //       menu: {
    //         title: 'External Link',
    //         url: 'http://akveo.com',
    //         icon: 'ion-android-exit',
    //         order: 800,
    //         target: '_blank'
    //       }
    //     }
    //  }


    ]
  }
];
