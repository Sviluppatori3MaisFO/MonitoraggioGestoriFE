dotnet ef dbcontext scaffold "User Id=flussi_fin;Password=nextam;Data Source=192.168.100.184:1521/orapsd;" Oracle.EntityFrameworkCore \
--output-dir Data/Models \
--context-dir Data \
--context FlussiFinContext \
--use-database-names \
--table AN_MONITORAGGIO_GESTORI \
--table AN_GESTORI \
--table SALDI_NORMALIZZATI \
--data-annotations \
--force
