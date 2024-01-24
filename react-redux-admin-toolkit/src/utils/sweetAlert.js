import swal from "sweetalert";

export const sweetAlertBasic = (msg) => {
  swal(msg);
};
export const sweetAlertStandard = (msg, type = "success") => {
  swal(msg.title, msg.msg, type);
};

export const sweetAlertConfirm = (msg, type = "success") => {
  swal({
    title: msg.title,
    text: msg.msg,
    icon: type,
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal(msg.msg, {
        icon: type,
      });
    } else {
      swal(msg.msg);
    }
  });
};
