import React, { useCallback, useMemo, forwardRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
const CustomSheet = forwardRef(function myFunction(props, ref) {
  const snapPoints = useMemo(() => ['80%'], []);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
    if (index === -1) {
      //   run db query
    }
  }, []);

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      enablePanDownToClose={true}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      {props.children}
    </BottomSheet>
  );
});
export default CustomSheet;
