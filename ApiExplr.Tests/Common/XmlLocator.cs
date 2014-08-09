using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiExplr.Tests.Common
{
    public static class XmlLocator
    {
        public static string GetPath() {
            var filename = "XmlDocument.xml";
            var currentDir = new System.Diagnostics.StackFrame(true).GetFileName();
            var workingFile = new FileInfo(currentDir);
            var pathToFile = string.Format("{0}\\App_Data\\{1}", workingFile.Directory.Parent.FullName, filename);
            return pathToFile;
        }
    }
}
