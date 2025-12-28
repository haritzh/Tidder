1. npm init -y
-- install yg dibutuhkan

2. npm i pg express ejs sequelize
-- install sequelize-cli agar bisa bikin command sequelize di terminal

3. npm i -D sequelize-cli 
https://sequelize.org/docs/v6/other-topics/migrations/
-- buat -> .gitignore => node_modules
-- buat -> folder: models, migrations, config, seeders
        ->  mkdir models migrations config seeders

4. npx sequelize init 

5. Ubah config/config.json di key development
-- username, password, dialect ganti jadi postgres. db diganti juga

6. npx sequelize db:create
-- Buat database sesuai dgn config => cek dbeaver akan tercipta db kalo sukses

>> npx sequelize model:create --name User --attributes username:string,email:string,password:string,role:string  <<

>> npx sequelize model:create --name Profile --attributes userId:integer,photoProfile:string,bio:text  <<

>> npx sequelize model:create --name Post --attributes userId:integer,title:string,content:text,createdAt:date  <<

>> npx sequelize model:create --name Interaction --attributes comment:string,upVotes:integer,downVotes:integer <<

>> npx sequelize model:create --name PostInteraction --attributes interactionId:integer,postId:integer <<

>> npx sequelize model:create --name StartUp --attributes startUpName:string,founderName:string,dateFound:date,educationOfFounder:string,roleOfFounder:string,IncubatorId:integer  <<
7. npx sequelize model:create --name NamaTable --attributes name:string,gender:string,dateOfBirth:date,phase:integer
-- Buat model beserta tabelnya => Harus nama model-nya (singular) => cek folder models & migrations akan tercipta file baru

8. npx sequelize db:migrate
-- Jalankan file migrasi yang sudah dibuat di no.7 => cek dbeaver akan tercipta tabel TabelName
-- [Optional]Cara membuat custom migration / migration skeleton

    8a. npx sequelize migration:create --name add-column-columnName-to-TableName
>> npx sequelize migration:create --name add-column-valuation-to-StartUp <<

    8b. Edit file custom migration-nya
    https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface
>> await queryInterface.addColumn('TableName', 'colomnName', Sequelize.INTEGER); <<
>> await queryInterface.dropTable('TableName', 'colomnName'); <<

    8b. npx sequelize migration:create --name add-FK-to-StartUp

    Setelah membuat & menjalankan custom migration, pastikan file modelnya jg diubah sesuai custom migration-nya, misalnya ditambahkan kolom baru
    8c. npx sequelize db:migrate

9. npx sequelize seed:generate --name seed-TableName
-- Buat file seeding

10. Buka folder seeders, edit file seed sesuai dengan data untuk seeding
-- require fs, nanti baut varabel di JSON.parse di map yang return el-nya isinya;
    createdAt = new Date()
    updatedAt = new Date()

11. Jalankan file seeder
npx sequelize db:seed:all 


Notes : 
- npx sequelize --help = untuk liat command2ny sequelize
- kalo gajadi migrate/ gajadi menjalankan file migration terakhir (satu )= npx sequelize db:migrate:undo
- kalo gajadi migrate/ gajadi menjalankan semua file migration = npx sequelize db:migrate:undo:all
- menjalankan file migration yg belum jalan = npx sequelize db:migrate
- folder migrations & seeders itu level db (menggunakan nama tabel), pake dokumetasi API
https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface
- folder models & controllers itu level aplikasi (menggunakan nama model/class), pake dokumentasi sequelize doc
https://sequelize.org/docs/v6/getting-started/
- menjalankan 1 file seeder = npx sequelize db:seed --seed namaFileSeeder
- menjalankan semua file seeder = npx sequelize db:seed:all


==============================================================================


1. Instalisasi
    1. npm init -y
    2. npm i pg express ejs sequelize 
    3. npm i -D sequelize-cli (agar bisa bikin command sequelize di terminal)
    4. .gitignore => node_modules

2. Buat folder
    1. models, migrations, config, seeders
        mkdir models migrations config seeders
    2. npx sequelize init 

3. Untuk config (buat database)
    1. Ubah config/config.json di key development
    2. npx sequelize db:create -Buat database sesuai dgn config lalu cek dbeaver 

npx sequelize migration:create --name add-colomnd-CategoryId-to-Recipes

4. Buat model beserta tabelnya
    1. Harus nama model-nya (singular)
    2. npx sequelize model:create --name NamaTable --attributes colomnName:string,colomnName:integer,colomnName:date,colomnName:boolean <<||>> folder models & migrations akan tercipta file baru
    https://sequelize.org/docs/v6/other-topics/migrations/#creating-the-first-model-and-migration
    3. npx sequelize db:migrate (dijalankan)
    cek dbeaver akan tercipta Tabel-nya  

npx sequelize migration:create --name add-rename-column-comment-to-Interactions

5. Untuk tambah kolom baru pada tabel
    1. npx sequelize migration:create --name add-column-active-to-Students <<||>> tercipta file baru pada migration
    https://sequelize.org/docs/v6/other-topics/migrations/#migration-skeleton

    2.  di migrationnya untuk up dan down https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface

    - add column : https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface#instance-method-addColumn
    - remove column :https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface#instance-method-removeColumn
    - rename column :https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface#instance-method-renameColumn

    3. npx sequelize db:migrate <<||>> dijalankan dan check dbeaver https://sequelize.org/docs/v6/other-topics/migrations/#running-migrations
    
    4. Model juga diubah ya
    
    5. Buat Foreign Key di Migration -- cek bagian foreign key usage https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface#instance-method-createTable

    6. Assosiasi di Model https://sequelize.org/docs/v6/advanced-association-concepts/creating-with-associations/

npx sequelize seed:create --name seed-Users
npx sequelize seed:create --name seed-Profiles
npx sequelize seed:create --name seed-Posts
npx sequelize seed:create --name seed-Interactions
npx sequelize seed:create --name seed-PostInteractions

6. File Seeding
    1. npx sequelize seed:create --name seed-TabelName 
    https://sequelize.org/docs/v6/other-topics/migrations/#creating-the-first-seed
    
    2. File seeder di edit
        1. const fs  
        2. di up, fs.readfile kemudian di map
            id di hapus, createdAt & UpdateAt new
            date()
        3. queryInterface.bulkInsert     
        4. yang down juga di queryInterface.bulkDelete
    3. npx sequelize db:seed:all | di seeding semua dan check dbeaver
    https://sequelize.org/docs/v6/other-topics/migrations/#running-seeds


NOTE:
- npx sequelize --help = untuk liat command2ny sequelize
- kalo gajadi migrate/ gajadi menjalankan file migration terakhir (satu )= npx sequelize db:migrate:undo
- kalo gajadi migrate/ gajadi menjalankan semua file migration = npx sequelize db:migrate:undo:all
- menjalankan file migration yg belum jalan = npx sequelize db:migrate
- folder migrations & seeders itu level db (menggunakan nama tabel), pake dokumetasi API
https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface
- folder models & controllers itu level aplikasi (menggunakan nama model/class), pake dokumentasi sequelize doc
https://sequelize.org/docs/v6/getting-started/
- menjalankan 1 file seeder = npx sequelize db:seed --seed namaFileSeeder
- menjalankan semua file seeder = npx sequelize db:seed:all


app.js
1. https://expressjs.com/
2. view engine, nanti ganti ke ejs : https://expressjs.com/en/guide/using-template-engines.html 
3. bodyparser : https://www.geeksforgeeks.org/express-js-express-urlencoded-function/


Controller

1. findAll: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-select-queries
2. findByPk: https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findbypk
3. attributes: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#specifying-attributes-for-select-queries
4. where: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#applying-where-clauses
5. Operator: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators
6. order: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#ordering-and-grouping
7. CREATE: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-insert-queries
8. UPDATE: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-update-queries
9. DELETE: https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#simple-delete-queries

kalau render ke halaman baru (ejs nya)
kalau redirect ke halaman yang sudah (endpoint)
1. manggil class
2. mangil op untuk operator https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators
3. buat class controllernya, jangan lupa di exports

Model

1. Hooks https://sequelize.org/docs/v6/other-topics/hooks/
2. Validation https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/




-------------------gabegitusesuai-------------------------

A. Home
    1. data di assign dengan ditunggu class.findAll
    2. kondisi didalam findAllnya
    3. render ejs home dan membawa data 

B. get Add
    1. findAll
    2. langsung render ke halaman baru (add)

C. post Add
    1. bawa apapun yang dibutuhkan ke body dan pake req
    2. ditunggu class.operatornya, misal create dengan membawa name dari body
    3. di redirect ke endpoint tujuan

D. edit pasti per id (getFindByPk)
    1. const id dari request param yang diminta
    2. cari 1 data
        buat variabel satu data di assign dengan tunggu class (yang isinya banyak data) lalu pakai operator findByPk menerima id
    3. render halaman baru, misal detail dengan membawa variabel no2

E. post edit nya (postFindyByPk)
    1. id karena findy by id
    2. request body dari getFindByPk
    3. satu data di assign ditungu class.findByPk sama kayak getFindByPk
    4. dituggu 1 data.update(req.body)
    5. di redirect ke endpoint tujuan

F. delete (hanya di controller)
    1. panggil id jadi req param karena delet berdasarkan permintaan params
    2. buat satu data dari findByPk
    3. ditungu 1 data.destroy
    4. redirect ke endpoint tujuan


Search :
ejs buat form yang actionnya kehalaman itu lagi dan metodenya get
kemudian buat input untuk ketik dan tombol searrch

controllernya masukin request query searchnya ke controller yang diminta
kemudian buat pengkondisian jika true
maka data yang diatasnya copy aja, tambahin where yang isinya objek dan nama query yang dicari kemudian buat objek lagi yang diisi dengan Op.iLike si searchnya


>> recipe; votes sama isPopular gak usah divalidasi di model, langsung tembak 0 & false aja <<
kalo pake Op di controller require jangan lupa