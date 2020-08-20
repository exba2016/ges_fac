import { Injectable } from '@angular/core';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

const { Filesystem } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class FileService {


  constructor() { }

  getFilesystemDirectory() {
    try {
      return FilesystemDirectory;
    } catch (error) {
      //this.logger.error(error);
      return null;
    }

  }

  getUri(path) {
    try {
      return Filesystem.getUri({
        directory: FilesystemDirectory.Documents,
        path: path
      });
    } catch (error) {
      //this.logger.error(error);
      return null;
    }

  }

  async fileWrite(path, data) {
    try {
      const result = await Filesystem.writeFile({
        path: path,
        data: data,
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8
      })
      ////console.log('Wrote file', result);
      return result;
    } catch (error) {
      //this.logger.error(error);
      return null;
    }

  }

  async fileRead(path) {
    try {
      let contents = await Filesystem.readFile({
        path: path,
        directory: FilesystemDirectory.Documents
      });
      return contents;
    } catch (error) {
      //this.logger.error(error);
      return null;
    }

  }

  async fileAppend(path, data) {
    try {
      return await Filesystem.appendFile({
        path: path,
        data: data,
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8
      });
    } catch (error) {
      //this.logger.error(error);
      return null;
    }

  }

  async fileDelete(path) {
    try {
      return await Filesystem.deleteFile({
        path: path,
        directory: FilesystemDirectory.Documents
      });
    } catch (error) {
      //this.logger.error(error);
      return null;
    }

  }

  async mkdir(dirname) {
    try {
      let ret = await Filesystem.mkdir({
        path: dirname,
        directory: FilesystemDirectory.Documents,
        recursive: false // like mkdir -p
      });
      return ret;
    } catch (error) {
      //this.logger.error(error);
      return null;
    }

  }

  async rmdir(dirname) {
    try {
      let ret = await Filesystem.rmdir({
        path: dirname,
        directory: FilesystemDirectory.Documents,
        recursive: false,
      });
      return ret;
    } catch (error) {
      //this.logger.error(error);
      return null;
    }

  }

  async readdir(dirname) {
    try {
      let ret = await Filesystem.readdir({
        path: dirname,
        directory: FilesystemDirectory.Documents
      });
      return ret;
    } catch (error) {
      //this.logger.error(error);
      return null;
    }
  }

  async stat(path) {
    try {
      let ret = await Filesystem.stat({
        path: path,
        directory: FilesystemDirectory.Documents
      });
    } catch (error) {
      //this.logger.error(error);
      return null;
    }

  }


  async rename(oldname, newname) {
    try {
      // This example moves the file within the same 'directory'
      let ret = await Filesystem.rename({
        from: oldname,
        to: newname,
        directory: FilesystemDirectory.Documents
      });
      return ret;
    } catch (error) {
      //this.logger.error(error);
      return null;
    }

  }

  async copy(frompath, topath) {
    try {
      let ret = await Filesystem.copy({
        from: frompath,
        to: topath,
        directory: FilesystemDirectory.Documents
      });
      return ret;
    } catch (error) {
      //this.logger.error(error);
      return null;
    }

  }
}
