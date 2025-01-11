import {
  Command,
  Github,
  Search,
  CloudDrizzle,
  CloudRain,
  Snowflake,
  CloudSun,
  Cloudy,
  Navigation,
  ThermometerSun,
  Sunset,
  Wind,
  Gauge,
  Droplets,
  Thermometer,
  Eye,
  UsersRound,
  CalendarDays,
  SunDim,
  
  Vote,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from '@fortawesome/free-solid-svg-icons';
import {
  faPoll,
  faChartBar,
  faFlag,
  faVoteYea,
  faPollH,
  faChartPie,
  faUserCheck,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { BiPlus, BiTrash, BiEdit } from "react-icons/bi";


export const BiPlusIcon = <BiPlus size={24} />;
export const BiTrashIcon = <BiTrash size={24} />;
export const BiEditIcon = <BiEdit size={24} />;
export const voteIcon = <Vote size={20} />;
export const downloadIcon = <FontAwesomeIcon icon={faDownload} />;
export const flagIcon = <FontAwesomeIcon icon={faFlag} />;
export const voteYesIcon = <FontAwesomeIcon icon={faVoteYea} />;;
export const pollHIcon = <FontAwesomeIcon icon={faPollH} />;
export const chartPieIcon = <FontAwesomeIcon icon={faChartPie} />;
export const userCheckIcon = <FontAwesomeIcon icon={faUserCheck} />;
export const pollIcon = <FontAwesomeIcon icon={faPoll} />;
export const histogramIcon = <FontAwesomeIcon icon={faChartBar} />;
export const commandIcon = <Command size={14} />;
export const github = <Github size={20} />;
export const searchIcon = <Search />;
export const drizzleIcon = <CloudDrizzle size={25} />;
export const rain = <CloudRain size={30} />;
export const snow = <Snowflake size={30} />;
export const clearSky = <CloudSun size={30} />;
export const cloudy = <Cloudy size={30} />;
export const navigation = <Navigation size={15} />;
export const thermo = <ThermometerSun size={15} />;
export const sunset = <Sunset size={15} />;
export const wind = <Wind size={15} />;
export const gauge = <Gauge size={15} />;
export const droplets = <Droplets size={15} />;
export const thermometer = <Thermometer size={15} />;
export const eye = <Eye size={15} />;
export const people = <UsersRound size={15} />;
export const calender = <CalendarDays size={15} />;
export const sun = <SunDim size={15} />;
export const lockIcon = <FontAwesomeIcon icon={faLock} />;