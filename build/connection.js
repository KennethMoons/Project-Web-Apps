var env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
var con=''
if(env==='dev') {
    con ='mongodb://localhost:3000/'
}
else
{
    con='mongodb://kenneth:telenet2017@ds119368.mlab.com:19368/bluraylist';
}
console.log(con);
exports.connectionString= con;