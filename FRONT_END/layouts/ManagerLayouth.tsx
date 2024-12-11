import React, { useState } from 'react';
import FileManagerTreeView from '../components/FileManagerTreeView';
import Header from '../components/Header';
import ProjectManagerTreeView from '../components/ProjectManagerTreeView';
import Search from '../components/Search';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { ProjectDir } from '../src/app/api/projet/all';

type Props = {
  children: JSX.Element;
  project?: ProjectDir;
  projects?: { name: string; size: number; createdAt: Date }[];
  root: Boolean;
  title: String;
  modalState?: {
    setState: Function;
    state: string;
    submit: Function;
  };
};
const ManagerLayouth = ({ children, project, projects, root, title, modalState }: Props) => {
  const [createProject, setCreateProject] = useState(false);

  const createNewProject = () => {};

  return (
    <div className="flex flex-col items-start justify-between w-full h-screen overflow-hidden">
      <Header />
      <div className="w-full h-full m-auto mt-0 overflow-hidden">
        <div className="relative flex items-start justify-start w-full h-full pt-4 pl-1 overflow-hidden">
          {root ? (
            <ProjectManagerTreeView title={title} projects={projects} action={() => null} />
          ) : (
            <FileManagerTreeView title={title} project={project} action={() => null} />
          )}
          <section className="relative flex flex-col justify-between w-full h-full pl-4 overflow-hidden">
            <Search />
            <div className="w-full h-full p-2 overflow-hidden">
              <div className="relative w-full h-full p-4 overflow-hidden border rounded-lg bg-blue-gray-50">
                {children}
                {root && (
                  <button
                    className="flex items-center justify-start w-64 h-12 px-4 text-white bg-blue-500 rounded-lg hover:bg-blue-400"
                    onClick={() => setCreateProject(true)}
                    style={{ position: 'absolute', right: '2rem', bottom: '2rem' }}
                  >
                    <span className="text-light-blue-500">
                      <AiOutlinePlus size={24} className="fa-2x" />
                    </span>
                    <p className="pl-4 font-bold capitalize">nouvelle composition</p>
                  </button>
                )}
              </div>
            </div>
          </section>
          {/* modal create project */}
          {createProject && modalState ? (
            <div className="absolute z-50 w-full h-full" style={{ background: 'rgba(3, 3, 3, 0.4)' }}>
              <div className="relative flex items-center justify-center w-full h-full ">
                <div className="bg-white rounded-lg w-96 h-52">
                  <h1 className="py-3 mt-2 text-2xl font-extrabold text-center">Nouvelle composition</h1>
                  <h4 className="px-2 mt-2 font-bold">Nom de la composition</h4>
                  <div className="p-2">
                    <input
                      type="text"
                      className="w-full h-12 px-2 border rounded-lg border-blue-gray-200"
                      placeholder="Project name"
                      value={modalState ? modalState.state : ''}
                      onChange={(e) => {
                        modalState ? modalState.setState(e.target.value) : null;
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          modalState ? modalState.submit() : null;
                          setCreateProject(false);
                        }
                      }}
                    />
                  </div>
                </div>
                <button
                  className="absolute top-0 right-0 w-12 h-12 text-white"
                  onClick={() => {
                    setCreateProject(false);
                  }}
                >
                  <AiOutlineClose size={24} className="fa-2x" />
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerLayouth;
