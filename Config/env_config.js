// Change this value to switch environment   
const env = 'test'; // Options: 'test', 'stage'

const config = 
{
 test: 
 {
 baseURL: 'https://rahulshettyacademy.com/client',
 username: 'roshan.thomas@test.com',
 password: 'Password2.',
 },


 stage: 
 {
 baseURL: 'https://stage.roshan.com',
 username: 'stageRoshan_User_CHANGE',
 
 password: 'stageRoshan_Pass',
 },
  
 PreProd: 
 {
 baseURL: 'https://preprod.roshan.com',
 username: 'preprodRoshan_User',
 password: 'preprodRoshan_Pass',
 },

};

module.exports = config[env];
