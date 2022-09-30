import ContextMenu from '../ContextMenu';
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const CardActions = ({ id }) => {
  const editPiece = () => {
    console.log('edit', id);
  };

  const deletePiece = () => {
    console.log('delete', id);
  };

  return (
    <ContextMenu
      icon={<MenuIcon />}
      items={[
        {
          icon: <EditIcon />,
          title: 'Editar',
          class: 'edit',
          action: editPiece,
        },
        {
          icon: <DeleteIcon />,
          title: 'Eliminar',
          class: 'delete',
          action: deletePiece,
        },
      ]}
    />
  );
};

export default CardActions;
